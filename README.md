<div align="center">
    <img alt="Logo" title="Ecoleta - Ajude o meio ambiente!" width="100%" style="max-width:700px;" src=".github/preview.png">
    <br><br>
    <h1 style="border:0;font-weight:bold;text-transform:uppercase;margin:0">Ecoleta</h1>
    <b>♻️ Ajude o meio ambiente!</b>  
    <br>
    <a href="https://github.com/lenivene/startup-ecoleta/blob/master/license.md">
        <img src="https://img.shields.io/github/license/lenivene/startup-ecoleta?color=%23342354&style=flat-square" alt="license - MIT">
    </a>
</div>

<a id="indice"></a>

# 📔 Índice

- [📔 Índice](#-índice)
- [📖 Sobre](#-sobre)
- [🚀 Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [📚 Como usar](#-como-usar)
  - [1 - Clone este repositório](#1---clone-este-repositório)
  - [2 - Agora instalando os pacotes](#2---agora-instalando-os-pacotes)
  - [3 - Criando banco de dados e executando servidor](#3---criando-banco-de-dados-e-executando-servidor)
  - [4 - Agora vamos iniciar a aplicação web](#4---agora-vamos-iniciar-a-aplicação-web)
  - [5 - Executando o aplicativo mobile](#5---executando-o-aplicativo-mobile)
- [📝 License](#-license)

# 📖 Sobre

O _Ecoleta_ é uma aplicação é para ajudar pessoas a encontrarem pontos de coleta para reciclagem.

# 🚀 Tecnologias Utilizadas

A startup foi desenvolvido utilizando as seguintes tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [ReactJS](https://reactjs.org/)
- [React Native](https://reactnative.dev/)

# 📚 Como usar

- Para utilizar, é necessário algums coisas
  - Terminal
  - Possuir o [Node.js](https://nodejs.org/en/download/) em uma versão estável
  - Tenha também um gerenciador de pacotes. Eu recomendo o [Yarn](https://classic.yarnpkg.com/pt-BR/docs/install/), mas você pode usar o [NPM](https://www.npmjs.com/).
- Com Node e um gerenciador de pacotes instalados, agora é preciso do [Expo](https://docs.expo.io/#quick-start) instalado globalmente.

## 1 - Clone este repositório

Execute o comando a seguir para clonar:

```sh
git clone git@github.com:lenivene/startup-ecoleta.git
```

> Se o comando de clonar não funcionar, instale o GIT no seu computador.<br />
> _Não precisa `clonar`_, basta você baixar, mas eu recomendo clonar 😅

## 2 - Agora instalando os pacotes

Abra o terminal nas pastas: `backend`, `mobile` e `web`, após isso, execute o comando:

```sh
yarn install #ou
npm install
```

Bom... daqui pra frente vou só mostrar exemplos de comando com `Yarn`, que é o gerenciador que eu mais utilizo.

## 3 - Criando banco de dados e executando servidor

Com o terminal aberto na pasta do `backend`, execute os seguintes comando para criar o banco de dados:

```sh
yarn knex:migrate
yarn knex:seed
```

Tudo certo?! Agora vamos iniciar o **servidor** executando o comando:

```sh
yarn dev
```

## 4 - Agora vamos iniciar a aplicação web

A aplicação web, é o famoso site da startup, blz?!
Para iniciar, tem que fazer o processo parecido com o `backend`, processo esse, que é abrir o terminal na pasta `web`, simples assim.

Se até agora você ainda está sem entender como é isso, basta você abrir o terminal na pasta que você clonou o repositório, pasta essa que o nome é `startup-ecoleta`, e no terimal digitar:

```sh
cd ./web
```

Fácil, né?! Agora vamos executar o comando para iniciar a aplicação, segue o comando:

```sh
yarn start
```

## 5 - Executando o aplicativo mobile

Para fazer esse processo, é o mesmo "esquema" que foi feito na aplicação `web`, basta entrar na pasta `mobile` e executar os mesmos comando.

# 📝 License

Esse projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
