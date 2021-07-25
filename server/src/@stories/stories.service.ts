import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Images } from 'src/entities/Images';
import { Stories } from 'src/entities/Stories';
import { Repository } from 'typeorm';
import { Announcements } from 'src/entities/Announcements';
import { Countries } from 'src/entities/Countries';
import { StoryLike } from 'src/entities/StoryLike';
import { StoryRequestDto } from 'src/dto/story.request.dto';
@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Stories)
    private StoriesRepository: Repository<Stories>,
    @InjectRepository(Countries)
    private CountriesRepository: Repository<Countries>,
    @InjectRepository(Images)
    private ImagesRepository: Repository<Images>,
    @InjectRepository(StoryLike)
    private StoryLikeRepository: Repository<StoryLike>,
    @InjectRepository(Announcements)
    private AnnouncementsRepository: Repository<Announcements>,
  ) {}

  async createPost(
    form: StoryRequestDto,
    userId: number,
    file: Express.Multer.File,
  ) {
    if (!form) {
      throw new NotFoundException('작성 할 데이터가 없습니다.');
    }
    if (!userId) {
      throw new UnauthorizedException('유저를 찾지 못했습니다.');
    }
    const country = await this.CountriesRepository.findOne({
      where: { code: form.code },
    });
    const newPostCreate = new Stories();
    newPostCreate.code = form.code;
    newPostCreate.title = form.title;
    newPostCreate.content = form.content;
    newPostCreate.region = form.region;
    newPostCreate.lat = form.lat;
    newPostCreate.lng = form.lng;
    newPostCreate.country = <any>{ id: country.id };
    newPostCreate.user = <any>{ id: userId };
    if (file) {
      newPostCreate.thumbnail =
        process.env.BACK_URL + file.path.replace('\\', '/');
    }
    const newPost = await this.StoriesRepository.save(newPostCreate);
    await this.AnnouncementsRepository.save({
      userId: userId,
      storyId: newPost.id,
      content: `${form.title.slice(10)}...을 작성했습니다.`,
    });
    return true;
  }

  async saveImage(file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('사용 할 이미지가 없습니다.');
    }
    const newImage = new Images();
    newImage.image_src = process.env.BACK_URL + file.path.replace('\\', '/');
    await this.ImagesRepository.save(newImage);
    return true;
  }

  async getOnePost(storyId: number, code: string) {
    const post = await this.StoriesRepository.findOne({
      where: {
        id: storyId,
        code,
      },
      relations: [
        'user',
        'country',
        'likedUser',
        'images',
        'comments',
        'comments.user',
        'comments.subComments',
        'comments.subComments.user',
      ],
    });
    if (!post) {
      throw new NotFoundException('가져올 게시물이 없습니다.');
    }
    return post;
  }

  async getFilterPost(filter: string, page?: number) {
    const filterPosts = await this.StoriesRepository.createQueryBuilder(
      'stories',
    )
      .leftJoinAndSelect('stories.country', 'country')
      .leftJoinAndSelect('stories.user', 'user')
      .leftJoinAndSelect('stories.likedUser', 'likedUser')
      .leftJoinAndSelect('stories.comments', 'comments')
      .leftJoinAndSelect('stories.images', 'images')
      .getMany();
    switch (filter) {
      case 'popular':
        return filterPosts
          .sort((a, b) => b.likedUser.length - a.likedUser.length)
          .slice((page - 1) * 10, page * 10);
      case 'comment':
        return filterPosts
          .sort((a, b) => b.comments.length - a.comments.length)
          .slice((page - 1) * 10, page * 10);
    }
  }

  async getPosts(page?: number) {
    const posts = await this.StoriesRepository.createQueryBuilder('stories')
      .leftJoinAndSelect('stories.country', 'country')
      .leftJoinAndSelect('stories.user', 'user')
      .leftJoinAndSelect('stories.likedUser', 'likedUser')
      .leftJoinAndSelect('stories.comments', 'comments')
      .leftJoinAndSelect('stories.images', 'images')
      .orderBy('stories.id', 'DESC')
      .skip((page - 1) * 10)
      .take(10)
      .getMany();

    return posts;
  }

  async editPost(form: StoryRequestDto, file: Express.Multer.File) {
    const country = await this.CountriesRepository.findOne({
      where: { code: form.code },
    });
    const editedPost = await this.StoriesRepository.createQueryBuilder(
      'stories',
    )
      .update('stories')
      .set({
        code: form.code,
        title: form.title,
        content: form.content,
        region: form.region,
        lat: form.lat,
        lng: form.lng,
        country: <any>{ id: country.id },
      })
      .where('id = :id', { id: parseInt(form.id) })
      .execute();
    if (file) {
      await this.StoriesRepository.createQueryBuilder('stories')
        .update('stories')
        .set({
          thumbnail: process.env.BACK_URL + file.path.replace('\\', '/'),
        })
        .where('id = :id', { id: parseInt(form.id) })
        .execute();
    }
    if (!editedPost) {
      throw new NotFoundException('수정 할 게시물이 없습니다.');
    }
    return true;
  }

  async likePost(storyId: number, userId: number) {
    if (!storyId) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
    if (!userId) {
      throw new UnauthorizedException('유저를 찾지 못했습니다.');
    }
    const newPostLike = new StoryLike();
    newPostLike.userId = userId;
    newPostLike.storyId = storyId;
    return await this.StoryLikeRepository.save(newPostLike);
  }

  async dislikePost(storyId: number, userId: number) {
    if (!storyId) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
    if (!userId) {
      throw new UnauthorizedException('유저를 찾지 못했습니다.');
    }
    return await this.StoryLikeRepository.delete({ storyId, userId });
  }

  async deletePost(storyId: number) {
    if (!storyId) {
      throw new NotFoundException('게시물을 찾을 수 없습니다.');
    }
    return await this.StoriesRepository.delete({
      id: storyId,
    });
  }
}
