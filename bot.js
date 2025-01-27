const venom = require('venom-bot');

venom
.create({
    headless: false, // Torna o navegador visível
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars', // Desabilita a barra de informação "Este navegador está sendo controlado"
      '--disable-dev-shm-usage', // Pode ajudar em alguns casos
      '--remote-debugging-port=9222', // Habilita o modo de depuração remota
      '--disable-features=VizDisplayCompositor', // Pode ajudar com a exibição do navegador
    ],
    userDataDir: './user_data', // Cria um diretório para armazenar dados do usuário e evitar o modo anônimo
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

function start(client) {
  client.onMessage(async (message) => {
    if (message.body.toLowerCase() === 'oi' || message.body.toLowerCase() === 'olá') {
      await client.sendText(
        message.from,
        'Olá, boa noite! Bem-vindo ao Lanche da Preta. Vou te ajudar com seu pedido. Aguarde alguns segundos...'
      );
      setTimeout(() => {
        client.sendText(
          message.from,
          'Deseja comprar:\n1 - Combo\n2 - Hambúrguer Tradicional\n3 - Hambúrguer Picanha\n4 - Batata Frita\n5 - Bebidas'
        );
      }, 2000);
    } else if (message.body === '1') {
      await client.sendText(
        message.from,
        'Você escolheu Combo. Qual tipo?\n1 - Combo Tradicional\n2 - Combo Picanha'
      );
    } else if (message.body === '2') {
      await client.sendText(
        message.from,
        'Linha Tradicional:\n1 - X-Burguer\n2 - X-Egg Burguer\n3 - X-Egg Bacon\n4 - Cheddar Bacon'
      );
    } else if (message.body === '3') {
      await client.sendText(
        message.from,
        'Linha Premium:\n1 - X-Burguer Sabor Picanha\n2 - X-Egg Bacon Sabor Picanha'
      );
    } else if (message.body === '4') {
      await client.sendText(
        message.from,
        'Batata:\n1 - Batata Pequena\n2 - Batata com Cheddar e Bacon'
      );
    } else if (message.body === '5') {
      await client.sendText(
        message.from,
        'Bebidas:\n1 - Coca-Cola\n2 - Guaraná\n3 - Água'
      );
    } else if (['1', '2', '3', '4', '5'].includes(message.body)) {
      await client.sendText(
        message.from,
        'Deseja adicionar mais algo? Digite o número correspondente ou diga "Finalizar".'
      );
    } else if (message.body.toLowerCase() === 'finalizar') {
      await client.sendText(
        message.from,
        'Por favor, informe seu endereço. Escolha a região:\n1 - Itaipu\n2 - Camboinhas\n3 - Piratininga\n4 - Engenho do Mato'
      );
    } else if (['1', '2', '3', '4'].includes(message.body)) {
      const taxa = {
        1: 5, // Itaipu
        2: 7, // Camboinhas
        3: 6, // Piratininga
        4: 8, // Engenho do Mato
      };
      const local = {
        1: 'Itaipu',
        2: 'Camboinhas',
        3: 'Piratininga',
        4: 'Engenho do Mato',
      };
      await client.sendText(
        message.from,
        `Taxa de entrega para ${local[message.body]}: R$${taxa[message.body]}. Agora, qual será a forma de pagamento?\n1 - Pix\n2 - Cartão\n3 - Dinheiro`
      );
    } else if (message.body === '3') {
      await client.sendText(message.from, 'Se for dinheiro, informe o troco para quanto?');
    } else {
      await client.sendText(
        message.from,
        'Desculpe, não entendi. Por favor, escolha uma opção válida do menu.'
      );
    }
  });
}
