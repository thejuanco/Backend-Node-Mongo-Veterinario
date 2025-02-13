import nodemailer from 'nodemailer';

const emailForgotPassword = async (data) => {
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
        subject: "Restablece tu contraseña",
        text: `Hola ${data.nombre}, haz solicitado cambiar tu contraseña`,
        html: `<h1>Hola ${data.nombre}</h1>
            <p>Para restablecer tu contraseña, haz click en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/olvide-password/${data.token}">Restablece tu contraseña</a></p>

            <p>Si no fuiste tu, ignora este correo</p>
        `,
    });

    console.log("Email sent: %s", info.messageId);
};

export default emailForgotPassword;