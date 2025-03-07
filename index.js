const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seu-email@gmail.com', // Substitua pelo seu e-mail
        pass: 'sua-senha' // Substitua pela sua senha
    }
});

exports.enviarEmail = functions.https.onRequest(async (req, res) => {
    const { userId, pedidoId } = req.body;

    // Aqui você pode buscar os detalhes do pedido e do usuário no Firestore
    // Exemplo:
    // const pedido = await firestore.collection('pedidos').doc(pedidoId).get();
    // const usuario = await firestore.collection('usuarios').doc(userId).get();

    const mailOptions = {
        from: 'seu-email@gmail.com',
        to: 'email-do-usuario@dominio.com', // Substitua pelo e-mail do usuário
        subject: 'Pedido Entregue',
        text: `Seu pedido ${pedidoId} foi marcado como entregue. Obrigado por usar nosso serviço!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).send('Erro ao enviar e-mail.');
        } else {
            console.log('E-mail enviado:', info.response);
            res.status(200).send('E-mail enviado com sucesso!');
        }
    });
});
