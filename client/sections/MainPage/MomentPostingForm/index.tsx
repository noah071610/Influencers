import { EditOutlined } from "@ant-design/icons";
import ImageDragger from "@components/Editor/ImageDragger";
import { momentCreateAction, momentEditAction } from "actions/moment";
import { Select } from "antd";
import { toastErrorMessage } from "config";
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MomentPostingFormWrapper } from "./styles";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import { ICountry, IMoment } from "@typings/db";
import AutoCompleteForm from "@components/AutoCompleteForm";
import { RootState } from "slices";
import dynamic from "next/dynamic";
const { Option } = Select;

const EditorWithoutImage = dynamic(import("@components/Editor/EditorWithoutImage"));

interface IProps {
  editPost?: IMoment;
}

const MomentPostingForm: FC<IProps> = ({ editPost }) => {
  const { data: countries } = useSWR<ICountry[]>("/country", fetcher);
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [upImg, setUpImg] = useState<File[]>([]);
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [type, setType] = useState("키워드 선택");
  const [selectedCountry, setCountry] = useState("");
  const [onPostingForm, setOnPostingForm] = useState(false);
  const { momentCreateDone, momentEditDone } = useSelector((state: RootState) => state.moment);
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (momentCreateDone) {
      setContent("");
      setUpImg([]);
      setType("키워드 선택");
      setOnPostingForm(false);
    }
  }, [momentCreateDone]);
  useEffect(() => {
    if (momentEditDone) {
      setContent("");
      setUpImg([]);
      setType("키워드 선택");
      setOnPostingForm(false);
    }
  }, [momentEditDone]);

  useEffect(() => {
    if (editPost) {
      setIsEdit(true);
      setContent(editPost?.content);
      setType(editPost?.type);
      setCountry(editPost?.country?.name);
    }
  }, [editPost]);
  const countryOptions = useMemo(
    () =>
      countries?.map((v, i) => {
        return { value: v.name, code: v.code };
      }),
    [countries]
  );
  useEffect(() => {
    if (query?.code && countryOptions) {
      let pickCountry = countryOptions?.find((v) => v.code === query?.code);
      setCountry(pickCountry?.value as string);
    }
  }, [query, countryOptions]);

  const onClickSubmit = useCallback(() => {
    if (type === "키워드 선택") {
      toastErrorMessage("키워드를 선택해주세요.");
      return;
    }
    if (!content) {
      toastErrorMessage("내용을 작성해주세요.");
      return;
    }
    let form: FormData = new FormData();
    upImg?.forEach((v) => {
      form.append("image", v);
    });
    form.append("content", String(content));
    form.append("type", String(type));

    let pickCountry = countryOptions?.find((v) => v.value === selectedCountry);
    if (pickCountry) {
      form.append("code", String(pickCountry.code));
    } else {
      toastErrorMessage("유효하지 않은 국가입니다. 다시 확인해주세요.");
      return;
    }
    if (isEdit) {
      form.append("momentId", String(editPost?.id));
      dispatch(momentEditAction(form));
    } else {
      dispatch(momentCreateAction(form));
    }
  }, [upImg, content, type, selectedCountry, isEdit, editPost]);

  const onClickOpenPostingForm = useCallback(() => {
    if (!user) {
      toastErrorMessage("로그인이 필요합니다.");
      return;
    }
    setOnPostingForm(true);
  }, [user]);
  const onClickPostingCancle = useCallback(() => {
    if (isEdit) {
      router.back();
    } else {
      setOnPostingForm(false);
    }
  }, [isEdit]);

  const handleTypeChange = useCallback((value: string) => {
    setType(value);
  }, []);

  return (
    <MomentPostingFormWrapper>
      {!onPostingForm && !isEdit && (
        <div onClick={onClickOpenPostingForm} className="posting-form-preview">
          <span className="placeholder">당신의 여행은 어땠나요?</span>
          <a>
            <EditOutlined />
          </a>
        </div>
      )}
      {(onPostingForm || isEdit) && (
        <>
          <div className="posting-editor">
            <div className="selector-wrapper">
              <AutoCompleteForm
                countryOptions={countryOptions}
                selectedCountry={selectedCountry}
                setCountry={setCountry}
                disabled={isEdit ? true : false}
              />
              <Select
                className="type-selector"
                value={type}
                disabled={isEdit ? true : false}
                onChange={handleTypeChange}
                style={{ width: "180px" }}
              >
                <Option value="한인 커뮤니티">한인 커뮤니티</Option>
                <Option value="여행정보 공유">여행정보 공유</Option>
                <Option value="사기 경보">사기 경보</Option>
                <Option value="동행자 모집">동행자 모집</Option>
              </Select>
            </div>
            <EditorWithoutImage content={content} setContent={setContent} />
            <ImageDragger setUpImg={setUpImg} />
            <div className="editor-btn-wrapper">
              <button onClick={onClickSubmit}>모멘트 올리기</button>
              <button onClick={onClickPostingCancle}>취소</button>
            </div>
          </div>
        </>
      )}
    </MomentPostingFormWrapper>
  );
};

export default memo(MomentPostingForm);
