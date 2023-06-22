import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as S from "./style";
import InputMask from "react-input-mask";
import sendMessage from "../../api/sendMessage";

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
      receiveNotification();
      deleteReceiveNotification()
    }, 5000);   
    return () => clearInterval(interval,);
    
  });

  useEffect(() => {  
      deleteReceiveNotification()    
  });
 

  function addMessage() {
    if (value !== "") {
      setTodos([...todos, value]);
      setValue("");
    }
  }

  const deleteMessage = (text) => {
    const newTodos = todos.filter((message) => {
      return message !== text;
    });
    setTodos(newTodos);
  };

  async function receiveNotification() {
    try {
      const data = await (
        await fetch(
          `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
          {
            method: "GET",
          }
        )
      ).json();
      let message = "";
      if (data.body.senderData.chatId === `${userPhone}@c.us`) {
        message = data.body.messageData.textMessageData.textMessage;
      }
      if (message !== "") {
        setTodos([...todos, message]);
      }
      console.log(data);
      console.log(message);
      setReceiptId(data.receiptId);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function deleteReceiveNotification() {
    const data = await (
      await fetch(
        `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
        {
          method: "DELETE",
        }
      )
    ).json();
    console.log(data)
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
  function checkMessages() {
    receiveNotification();
  }

  // function addTextMessage() {
  //   if (chatId === `${userPhone}@c.us` && get !== "") {
  //     console.log("сообщение добавлено");
  //     // setTodos([...todos, get]);
  //     // setGet("");
  //     deleteReceiveNotification();
  //   } else {
  //     deleteReceiveNotification();
  //   }
  // }

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
      <button onClick={checkMessages}>Проверить входящие</button>
      <button onClick={deleteReceiveNotification}>Удалить</button>
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
