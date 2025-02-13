import nodemailer from 'nodemailer';

const emailRegistro = async (data) => {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //Enviar el correo
    const info = await transport.sendMail({
        from: "APV - Administrador de pacientes de veterinaria",
        to: data.email,
        subject: "Comprueba tu cuenta en APV",
        text: `Hola ${data.nombre}, para confirmar tu cuenta, haz click en el siguiente enlace:`,
        html: `<h1>Hola ${data.nombre}</h1>
            <p>Para confirmar tu cuenta, haz click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar/${data.token}">Confirmar cuenta</a></p>

            <p>Si tu no creaste tu cuenta ignora este correo</p>
        `,
    });

    console.log("Email sent: %s", info.messageId);
};

export default emailRegistro;