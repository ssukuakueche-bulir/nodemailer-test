# Nodemailer Test - Envio de Emails

Implementação completa de envio de emails com Node.js usando Nodemailer, incluindo configuração para desenvolvimento local com MailDev.

## 📋 Recursos

- ✅ Envio de emails simples (texto e HTML)
- ✅ Suporte a múltiplos destinatários, CC e BCC
- ✅ Anexos de arquivos
- ✅ Templates de email pré-definidos
- ✅ Envio em lote (múltiplos emails)
- ✅ Verificação de conexão SMTP
- ✅ Configuração via arquivo .env
- ✅ Suporte a diferentes provedores (Gmail, Outlook, Yahoo, SendGrid, Mailgun)
- ✅ **Configuração para desenvolvimento local com MailDev**

## 🚀 Instalação

1. **Clone ou baixe o projeto**

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure suas credenciais:**
```bash
cp .env.example .env
```

4. **Edite o arquivo .env** com suas credenciais reais

## 🧪 MailDev - Servidor SMTP Local para Desenvolvimento

O **MailDev** é um servidor SMTP local que captura todos os emails enviados durante o desenvolvimento, permitindo que você teste seus emails sem enviar para endereços reais.

### 📦 Instalação do MailDev

Você pode instalar o MailDev de duas formas:

#### Opção 1: Instalação Global (Recomendada)
```bash
npm install -g maildev
```

#### Opção 2: Instalação Local no Projeto
```bash
npm install --save-dev maildev
```

### 🚀 Iniciando o MailDev

#### Se instalado globalmente:
```bash
maildev
```

#### Se instalado localmente:
```bash
npx maildev
```

#### Ou adicione um script no package.json:
```json
{
  "scripts": {
    "maildev": "maildev",
    "dev": "maildev & npm start"
  }
}
```

Depois execute:
```bash
npm run maildev
```

### ⚙️ Configuração do .env para MailDev

Quando o MailDev estiver rodando, configure seu arquivo `.env` assim:

```env
# Configurações para MailDev (Desenvolvimento Local)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=

# Configurações do remetente (pode ser qualquer coisa)
FROM_NAME=Desenvolvedor Local
FROM_EMAIL=dev@localhost.com

# Configurações adicionais
EMAIL_TIMEOUT=10000
EMAIL_DEBUG=true
```

### 🌐 Interface Web do MailDev

Após iniciar o MailDev, você pode acessar a interface web em:

**http://localhost:1080**

Nesta interface você pode:
- ✅ Ver todos os emails enviados
- ✅ Visualizar emails em HTML e texto
- ✅ Baixar anexos
- ✅ Deletar emails
- ✅ Pesquisar emails

### 🔧 Configurações Avançadas do MailDev

```bash
# Porta personalizada para SMTP
maildev --smtp 1025

# Porta personalizada para interface web
maildev --web 1080

# Definir IP específico
maildev --ip 127.0.0.1

# Salvar emails em arquivo
maildev --outgoing-host smtp.gmail.com --outgoing-port 587

# Executar em background
maildev --silent

# Ver todas as opções
maildev --help
```

### 🚦 Workflow de Desenvolvimento

1. **Inicie o MailDev:**
```bash
maildev
```

2. **Configure o .env para desenvolvimento:**
```env
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```

3. **Execute seus testes:**
```bash
npm run test
```

4. **Visualize os emails em:** http://localhost:1080

5. **Para produção, altere o .env** com suas credenciais reais

### 🔄 Alternar entre Desenvolvimento e Produção

#### Arquivo .env.development (MailDev)
```env
# MailDev - Desenvolvimento Local
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
FROM_NAME=Dev Team
FROM_EMAIL=dev@localhost.com
EMAIL_DEBUG=true
```

#### Arquivo .env.production (Gmail/Outros)
```env
# Gmail - Produção
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
FROM_NAME=Seu Nome
FROM_EMAIL=seu-email@gmail.com
EMAIL_DEBUG=false
```

#### Script para alternar:
```bash
# Para desenvolvimento
cp .env.development .env

# Para produção
cp .env.production .env
```

## ⚙️ Configuração para Produção

### Gmail (Recomendado)

1. Ative a autenticação de 2 fatores na sua conta Google
2. Gere uma "Senha de app" específica para esta aplicação
3. Configure no `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app-de-16-digitos
FROM_NAME=Seu Nome
FROM_EMAIL=seu-email@gmail.com
```

### Outros Provedores

O arquivo `.env.example` contém configurações para:
- Gmail
- Outlook/Hotmail
- Yahoo
- SendGrid
- Mailgun

## 🧪 Testes

```bash
# Verificar apenas a conexão
npm start

# Testar apenas conectividade SMTP
node example.js conexao

# Enviar um email rápido de teste
node example.js rapido

# Executar todos os exemplos
npm run test
```

## 💻 Uso Básico

```javascript
const EmailService = require('./emailService');

const emailService = new EmailService();

// Email simples
await emailService.sendSimpleEmail(
  'destinatario@email.com',
  'Assunto do Email',
  'Conteúdo do email em texto'
);

// Email com HTML
await emailService.sendEmail({
  to: 'destinatario@email.com',
  subject: 'Email com HTML',
  html: '<h1>Olá!</h1><p>Este é um email com HTML.</p>'
});

// Usando templates
await emailService.sendTemplateEmail(
  'destinatario@email.com',
  'welcome',
  { name: 'João Silva' }
);
```

## 📧 Templates Disponíveis

### Welcome (Boas-vindas)
```javascript
await emailService.sendTemplateEmail('user@email.com', 'welcome', {
  name: 'Nome do Usuário'
});
```

### Notification (Notificação)
```javascript
await emailService.sendTemplateEmail('user@email.com', 'notification', {
  title: 'Título da Notificação',
  message: 'Mensagem da notificação',
  action: 'Texto do Botão',
  actionUrl: 'https://example.com'
});
```

### Reset Password (Redefinir Senha)
```javascript
await emailService.sendTemplateEmail('user@email.com', 'reset_password', {
  name: 'Nome do Usuário',
  resetUrl: 'https://example.com/reset/token123'
});
```

## 🔧 Funcionalidades Avançadas

### Anexos
```javascript
await emailService.sendEmailWithAttachment(
  'destinatario@email.com',
  'Email com Anexo',
  'Veja o arquivo em anexo.',
  [
    {
      filename: 'documento.pdf',
      path: './arquivos/documento.pdf'
    }
  ]
);
```

### Múltiplos Destinatários
```javascript
await emailService.sendEmail({
  to: ['user1@email.com', 'user2@email.com'],
  cc: 'gerente@email.com',
  bcc: 'log@email.com',
  subject: 'Email para múltiplos destinatários',
  text: 'Conteúdo do email'
});
```

### Envio em Lote
```javascript
const emails = [
  { to: 'user1@email.com', subject: 'Assunto 1', text: 'Mensagem 1' },
  { to: 'user2@email.com', subject: 'Assunto 2', text: 'Mensagem 2' }
];

const resultados = await emailService.sendMultipleEmails(emails);
```

## 🛠️ Estrutura do Projeto

```
nodemailer-test/
├── emailService.js       # Classe principal do serviço de email
├── example.js           # Exemplos de uso e testes
├── index.js            # Arquivo principal
├── package.json        # Dependências e scripts
├── .env               # Suas configurações (não versionar)
├── .env.example       # Exemplo de configurações
├── .env.development   # Configurações para MailDev (opcional)
├── .env.production    # Configurações para produção (opcional)
└── README.md          # Esta documentação
```

## 🚨 Troubleshooting

### Problemas com MailDev

**MailDev não inicia:**
```bash
# Verifique se a porta 1025 está livre
lsof -i :1025

# Ou use uma porta diferente
maildev --smtp 2525 --web 8080
```

**Interface web não abre:**
```bash
# Verifique se a porta 1080 está livre
lsof -i :1080

# Ou acesse: http://127.0.0.1:1080
```

### Erro de Autenticação
- **Gmail**: Use senha de app, não a senha normal
- **Outlook**: Verifique se SMTP está habilitado
- **Yahoo**: Ative "Aplicativos menos seguros"

### Erro de Conexão
- Verifique host e porta SMTP
- Teste a conectividade: `node example.js conexao`
- Verifique firewall/proxy

### Email não chega
- Verifique pasta de spam
- Confirme se o email remetente é válido
- Teste com email de destino diferente

## 📝 Logs e Debug

Para ativar logs detalhados, configure no `.env`:
```env
EMAIL_DEBUG=true
```

## 🔒 Segurança

- ✅ Nunca commite o arquivo `.env`
- ✅ Use senhas de app quando disponível
- ✅ Mantenha as dependências atualizadas
- ✅ Valide sempre os dados de entrada
- ✅ Use MailDev apenas em desenvolvimento

## 📚 Documentação

- [Nodemailer Official Docs](https://nodemailer.com/)
- [MailDev GitHub](https://github.com/maildev/maildev)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

## 🎯 Dicas de Desenvolvimento

1. **Sempre use MailDev em desenvolvimento** para não enviar emails reais
2. **Configure diferentes .env** para dev/prod
3. **Teste templates** na interface do MailDev antes de ir para produção
4. **Use DEBUG=true** para ver logs detalhados
5. **Mantenha backups** dos seus templates de email

## 🤝 Contribuição

Sinta-se à vontade para melhorar este projeto!

---

**Autor**: Seu Nome  
**Licença**: MIT
