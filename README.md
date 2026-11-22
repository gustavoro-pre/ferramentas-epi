# Ferramentas & EPI

App web instalável (PWA) para cautela de ferramentas, entrega de EPI, kits por função, autorizações da gerência, treinamentos com certificado, fichas de EPI, OS de Segurança e relatórios.

## Como funciona

- **Login:** e-mail e senha (Firebase Authentication). O administrador cadastra usuários em *Cadastros → Usuários*; cada pessoa recebe um e-mail para criar a senha.
- **Perfis:** Administrador, Gerente, Almoxarifado, TST e RH. As permissões valem no app e nas regras do banco (`firestore.rules`).
- **Banco:** Cloud Firestore com cache no aparelho. Funciona sem internet e sincroniza quando a conexão volta.
- **Instalável:** abra o endereço no celular e use "Adicionar à tela inicial".

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O app (telas e regras de negócio) |
| `fb.js` | Integração com Firebase: login, banco, perfis e downloads |
| `firebase-config.js` | Configuração pública do projeto Firebase |
| `firestore.rules` | Regras de segurança — colar em Firestore → Regras |
| `sw.js`, `manifest.webmanifest`, `icon-*.png` | App instalável e uso offline |

## Publicação

O site é estático: qualquer alteração enviada para a branch `main` é publicada pelo GitHub Pages. No Firebase, o domínio do GitHub Pages precisa estar em *Authentication → Configurações → Domínios autorizados*.

## Primeiro acesso

Na primeira vez que o app é aberto, ele mostra **Configuração inicial** para criar o administrador. Depois disso, essa tela não aparece mais.
