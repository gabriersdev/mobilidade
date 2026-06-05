# Documentação de Validação e Segurança

Este documento descreve o fluxo de autenticação e segurança da aplicação, que é baseado em verificação por captcha e sessões gerenciadas por cookies.

## Visão Geral

Para proteger os endpoints da API contra acesso automatizado e garantir que apenas usuários humanos possam interagir com os dados, a aplicação utiliza um sistema de verificação em duas etapas: primeiro, um desafio de captcha e, em seguida, uma sessão baseada em cookies para requisições subsequentes.

## Fluxo de Autenticação

O processo de autenticação ocorre da seguinte maneira:

### 1. Verificação Inicial (Captcha)

- Quando um usuário acessa a aplicação pela primeira vez ou sua sessão expira, ele é apresentado a uma tela de verificação com um desafio hCaptcha.
- O frontend não permite a interação com rotas protegidas até que a verificação seja concluída com sucesso.

### 2. Criação da Sessão

- Após o usuário resolver o captcha, o frontend envia um token de verificação para o backend através de uma requisição `POST` para o endpoint `/api/verify-session`.
- O backend valida o token. Se bem-sucedido, cria uma sessão segura e retorna uma resposta com um cabeçalho `Set-Cookie`.
- O cookie de sessão é configurado como `httpOnly`, o que significa que ele não pode ser acessado por scripts no lado do cliente, protegendo contra ataques de Cross-Site Scripting (XSS).

### 3. Requisições Autenticadas

- Todas as chamadas à API são feitas através de uma instância centralizada do Axios (`apiClient`).
- Esta instância é pré-configurada com `withCredentials: true`, garantindo que o cookie de sessão seja enviado automaticamente em cada requisição.
- O backend utiliza este cookie para identificar e autorizar o usuário, eliminando a necessidade de gerenciar tokens JWT no frontend.

### 4. Invalidação e Expiração da Sessão

- Se uma sessão expirar, o backend responderá a qualquer requisição para uma rota protegida com o status `401 Unauthorized`.
- A instância `apiClient` possui um interceptor global que captura todas as respostas de erro.
- Ao detectar um status `401`, o interceptor redireciona o usuário para a página inicial (`/`). Isso força um recarregamento completo da aplicação, o que, por sua vez, aciona o `CaptchaProvider` a exigir uma nova verificação.

## Resumo das Medidas de Segurança

- **Captcha**: Previne o acesso de bots e scripts automatizados.
- **Cookies httpOnly**: Isola o cookie de sessão do código JavaScript do cliente, mitigando riscos de XSS.
- **Instância Axios Centralizada**: Garante que todas as requisições sigam a política de segurança (enviando credenciais) e o tratamento de erros de forma consistente.
- **Tratamento Global de Erros 401**: Assegura que sessões expiradas sejam tratadas de forma imediata e uniforme em toda a aplicação.
- **Não Armazenamento de Tokens**: O frontend não armazena tokens de autenticação, reduzindo a superfície de ataque no lado do cliente.
