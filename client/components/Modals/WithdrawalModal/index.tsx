import useInput from "@hooks/useInput";
import { withdrawalUserAction } from "actions/user";
import { Select } from "antd";
import React, { FC, useCallback, useEffect, useState } from "react";
import { mainSlice } from "slices/main";
import { WithdrawalModalWrapper } from "./styles";
const { Option } = Select;
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "slices";
import { toastSuccessMessage } from "config";
import router from "next/router";
import { userSlice } from "slices/user";

interface IProps {}

const WithdrawalModal: FC<IProps> = () => {
  const dispatch = useDispatch();
  const [reason, setReason] = useState("");
  const { withdrawalUserDone } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (withdrawalUserDone) {
      toastSuccessMessage("회원탈퇴가 정상적으로 진행되었습니다. 이용해주셔서 감사합니다.");
      router.push("/");
      dispatch(userSlice.actions.withdrawalUserClear());
    }
  }, [withdrawalUserDone]);
  const [password, onChangePassword] = useInput("");
  const handleReasonChange = useCallback((value: string) => {
    setReason(value);
  }, []);
  const onClickWithdrawal = useCallback(() => {
    dispatch(withdrawalUserAction({ reason, password }));
  }, [reason, password]);
  return (
    <WithdrawalModalWrapper>
      <h3>회원탈퇴 사유를 선택해주세요.</h3>
      <Select
        value={reason}
        defaultValue="사유를 선택해주세요"
        onChange={handleReasonChange}
        style={{ width: "100%" }}
      >
        <Option value="사이트 속도 및 안정성 불만">사이트 속도 및 안정성 불만</Option>
        <Option value="컨텐츠 등 이용할 만한 서비스 부족">컨텐츠 등 이용할 만한 서비스 부족</Option>
        <Option value="사이트내 과도한 광고 및 홍보">사이트내 과도한 광고 및 홍보</Option>
        <Option value="부적절한 컨텐츠 및 악성유저">부적절한 컨텐츠 및 악성유저</Option>
        <Option value="관심도 저하">관심도 저하</Option>
        <Option value="개인정보 누출 우려">개인정보 누출 우려</Option>
      </Select>
      <h3>비밀번호를 입력해주세요</h3>
      <input
        value={password}
        onChange={onChangePassword}
        className="password-input"
        type="password"
      />
      <p>
        등록된 모멘트 및 연대기는 탈퇴 후에도 삭제되지 않습니다. 게시물 등의 삭제를 원하시는
        경우에는 반드시 탈퇴 전 삭제하시기 바랍니다.
      </p>
      <div className="btn-wrapper">
        <button onClick={() => dispatch(mainSlice.actions.closeModal())}>취소</button>
        <button onClick={onClickWithdrawal}>회원탈퇴</button>
      </div>
    </WithdrawalModalWrapper>
  );
};

export default WithdrawalModal;
