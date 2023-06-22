export default async function deleteReceiveNotification({
  idInstance,
  apiTokenInstance,
  receiptId,
}) {
  const data = await (
    await fetch(
      `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
      {
        method: "DELETE",
      }
    )
  ).json();
  console.log(data);
}
