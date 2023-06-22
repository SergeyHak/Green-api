export default function addTextMessage({ get, setGet, getNotification,userPhone,deleteReceiveNotification }) {
     let  message  = ''
  if (getNotification.body.senderData.chatId === `${userPhone}@c.us`) {
  message =   getNotification.body.messageData.textMessageData.textMessage;
    deleteReceiveNotification()
  } else if(getNotification.body.senderData.chatId !== `${userPhone}@c.us`){
    deleteReceiveNotification()
  }
  console.log(message);
  setGet(message)
  return message
}
