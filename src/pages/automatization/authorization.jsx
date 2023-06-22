import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as S from "./style";
import { setUser } from "../../slices/instanceApiGreen";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

export default function Authorization() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [userNumber, setUserNumber] = useState("");
  function setData() {
    dispatch(
      setUser({
        IdInstance: id,
        ApiTokenInstance: apiToken,
        UserNumber: userNumber,
      }),
      setId(""),
      setApiToken(""),
      setUserNumber(""),
      navigate("/chat", { replace: true })
    );
  }

  return (
    <S.ContentDiv>
      <span>Страница регистрации</span>
      <S.UserDataDiv>
        <input
          type="text"
          placeholder="Введите IdInstance"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Введите ApiTokenInstance"
          value={apiToken}
          onChange={(e) => {
            setApiToken(e.target.value);
          }}
        />
        <InputMask
          type="tel"
          mask="79999999999"
          placeholder="Введите номер"
          value={userNumber}
          onChange={(e) => {
            setUserNumber(e.target.value);
          }}
        ></InputMask>
        <button onClick={setData}>Создать чат</button>
      </S.UserDataDiv>
    </S.ContentDiv>
  );
}
