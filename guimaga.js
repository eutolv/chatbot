const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on('message', async msg => {
    if (msg.from.endsWith('@c.us')) {

        const chat = await msg.getChat();
        const contact = await msg.getContact();
        const name = contact.pushname ? contact.pushname.split(" ")[0] : 'Cliente';

        // Função para enviar a mensagem inicial com o menu
        async function enviarMenu() {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from, 
`Olá! ${name}, sou o assistente virtual da GUIMAGA Empilhadeiras. Como posso ajudá-lo hoje? Por favor, digite uma das opções abaixo:

1 - Ver modelos disponíveis  
2 - Me ajudar a escolher  
3 - Saber preços e prazos  
4 - Falar com atendente  
5 - Dúvidas frequentes`);
            await delay(3000);
            await chat.sendStateTyping();
            await delay(5000);
        }

        // Se a mensagem for saudação ou pedir menu
        if (msg.body.match(/(menu|Menu|dia|tarde|bom dia|boa noite|Bom dia|Boa noite|noite|oi|Oi|Olá|olá|ola|Ola)/i)) {
            await enviarMenu();
            return;
        }

        // Respostas para cada opção

        if (msg.body === '1') {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from,
`Aqui estão alguns exemplos dos modelos de empilhadeiras que oferecemos:

- Empilhadeira GLP  
- Empilhadeira Contrabalançada Elétrica
- Empilhadeira Retrátil
- Empilhadeira Patolada
- Transpaleteira Elétrica

Para mais informações e fotos, acesse nossa página no Instagram: https://www.instagram.com/guimagaempilhadeiras/;
No destaque "Nossos Produtos"

0 - Voltar ao início  
4 - Falar com atendente`);
            return;
        }

        if (msg.body === '2') {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from,
`Para te ajudar a escolher a empilhadeira ideal, responda algumas perguntas:

- Qual é a carga média que você precisa transportar?  
- Qual o ambiente de trabalho? (interno, externo ou misto)  
- Você prefere empilhadeira elétrica, a gás?  

Nosso time está pronto para te orientar com base nas suas respostas.

0 - Voltar ao início  
4 - Falar com atendente`);
            return;
        }

        if (msg.body === '3') {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from,
`O valor da locação varia de acordo com o tipo de operação, quantidade de turnos, distância do cliente, etc;
Recomenda-se falar com um atendente.

0 - Voltar ao início  
4 - Falar com atendente`);
            return;
        }

        if (msg.body === '4') {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from,
`Um de nossos atendentes entrará em contato com você em breve para prestar um atendimento personalizado. Por favor, aguarde.

0 - Voltar ao início  
4 - Falar com atendente`);
            return;
        }

        if (msg.body === '5') {
            await delay(3000);
            await chat.sendStateTyping();
            await delay(3000);
            await client.sendMessage(msg.from,
`Dúvidas Frequentes:

Quais tipos de empilhadeiras vocês alugam?

GLP, contrabalançada elétrica,  retrátil, patolada, transpaleteira elétrica

Qual empilhadeira é ideal para o meu tipo de operação?
Para determinar o tipo ideal de empilhadeira para o cliente sempre fazemos uma visita para entender a operação e indicar a empilhadeira que melhor irá atendê-lo

Qual o valor da locação?
O valor da locação varia de acordo com o tipo de operação, quantidade de turnos, distância do cliente, etc

A locação inclui manutenção?
A locação inclui manutenções preventivas e corretivas, em casos de mau uso (quando a quebra ocorre por uso indevido) é cobrado o valor das peças utilizadas.

O transporte está incluso no valor?
O transporte de entrega é cobrado junto com o primeiro aluguel, o de retorno junto com o último aluguel. O valor é calculado de acordo com distância do cliente.

Tem empilhadeira disponível agora?
Temos alguns modelos a pronta entrega, mas a maioria necessita de um prazo de entrega de até 20 dias .

Preciso de operador ou a empilhadeira já vem com um?
O operador deve ser um funcionário habilitado contratado pelo cliente.

Tem documentação exigida para alugar?
Necessário CNPJ sem restrição.

Quais são as condições de pagamento?
O pagamento é feito através de boleto ou transferência bancária sempre com vencimento no primeiro dia útil após 30 dias trabalhados, a nota de débito é emitida em até 5 dias após a entrega do equipamento.

Posso alugar por apenas 1 dia?
Não, nosso contrato mínimo é de 6 meses

Vocês treinam o operador da minha empresa?
Não, é exigido curso de operador de empilhadeira ministrado por alguma escola autorizada, porém na entrega da empilhadeira é feita a entrega técnica onde um técnico explica as características e os cuidados que se deve ter com o equipamento.

E se a empilhadeira quebrar durante o uso?
O prazo de atendimento é de até 24h após a abertura do chamado de  manutenção.

Posso testar a empilhadeira antes de alugar?
Somente se tivermos o equipamento ocioso em nosso estoque, mas isso é raro

Tem empilhadeiras para ambientes pequenos?
Sim, temos empilhadeiras para corredores estreitos e ambientes pequenos

Preciso de um modelo específico, vocês conseguem?
Sim, atendemos a demanda do cliente de acordo com a necessidade.

0 - Voltar ao início  
4 - Falar com atendente`);
            return;
        }

        // Caso o usuário envie '0' para voltar ao início
        if (msg.body === '0') {
            await enviarMenu();
            return;
        }

        // Se a mensagem não for reconhecida, enviar instrução para usar o menu
        await delay(3000);
        await chat.sendStateTyping();
        await delay(3000);
        await client.sendMessage(msg.from,
`Desculpe, não entendi sua mensagem. Por favor, digite uma das opções abaixo:

1 - Ver modelos disponíveis  
2 - Me ajudar a escolher  
3 - Saber preços e prazos  
4 - Falar com atendente  
5 - Dúvidas frequentes`);
    }
});
