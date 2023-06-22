export default async function receiveNotification({
  userPhone,
  setTodos,
  todos,
  setReceiptId,
  idInstance,
  apiTokenInstance,
}) {
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
