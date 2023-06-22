export default async function sendMessage({idInstance,apiTokenInstance,changePhone,phone,userPhone,value}) {
    try {
      const data = await (
        await fetch(
          `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
              chatId: `${changePhone ? phone : userPhone}@c.us`,
              message: value,
            }),
          }
        )
      ).json();
    } catch (err) {
      console.log(err.message);
    }
  }