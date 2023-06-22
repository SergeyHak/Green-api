import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as S from "./style";
import InputMask from "react-input-mask";
import sendMessage from "../../api/sendMessage";
import receiveNotification from "../../api/receiveNotification";
import deleteReceiveNotification from "../../api/deleteReceiveNotification";

export default function Chat() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [receiptId, setReceiptId] = useState("");
  const [changePhone, setChangePhone] = useState(false);
  const idInstance = useSelector((state) => state.user.IdInstance);
  const apiTokenInstance = useSelector((state) => state.user.ApiTokenInstance);
  const phone = useSelector((state) => state.user.UserNumber);
  const [userPhone, setUserPhone] = useState(phone);
  console.log(idInstance);
  console.log(apiTokenInstance);
  console.log(phone);

  useEffect(() => {
    const interval = setInterval(() => {
      receiveNotification({
        userPhone: userPhone,
        setTodos: setTodos,
        todos: todos,
        setReceiptId: setReceiptId,
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance,
      });
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    deleteReceiveNotification({
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
      receiptId: receiptId,
    });
  });

  const deleteMessage = (text) => {
    const newTodos = todos.filter((message) => {
      return message !== text;
    });
    setTodos(newTodos);
  };

  function addMessage() {
    if (value !== "") {
      setTodos([...todos, value]);
      setValue("");
    }
  }

  function sendMessages() {
    sendMessage({
      idInstance: idInstance,
      apiTokenInstance: apiTokenInstance,
      changePhone: changePhone,
      value: value,
      phone: phone,
      userPhone: userPhone,
    });
    addMessage();
  }

  return (
    <S.ContentDiv>
      <S.ChatDiv>
        <span>Чат с {userPhone}</span>
        <S.ChangeButton
          style={{ display: changePhone ? "none" : "block" }}
          onClick={() => {
            setChangePhone(true);
          }}
        >
          Изменить
        </S.ChangeButton>
        <S.SaveButton
          style={{ display: changePhone ? "block" : "none" }}
          onClick={() => {
            setChangePhone(false);
          }}
        >
          Сохранить
        </S.SaveButton>
        {changePhone ? (
          <InputMask
            mask="79999999999"
            type="tel"
            value={userPhone}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
          ></InputMask>
        ) : null}
      </S.ChatDiv>
      <input
        type="text"
        placeholder="Введите сообщение"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button onClick={sendMessages}>Отправить</button>
      {/* <button onClick={checkMessages}>Проверить входящие</button>
      <button onClick={deleteReceiveNotification}>Удалить</button> */}
      {todos?.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <div>
              <span key={index}> {todo}</span>
              <button
                onClick={() => {
                  deleteMessage(todo);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <div>
          <p>No message</p>
        </div>
      )}
    </S.ContentDiv>
  );
}
