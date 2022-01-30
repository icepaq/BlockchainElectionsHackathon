**A blockchain elections platform built on Ethereum**

ConuHacks 2022 Submission

## Tech Stack

Blockchain - Ethereum

Backend - Python/Flask, NodeJS/Express, MongoDB

Frontend - ReactJS

## Team

[Salah](https://github.com/itsSalah)

[Minh](https://github.com/minhtrannhat)

[Anton](https://github.com/icepaq)


## Smart Contract

The contract address is 0x605411AE9739EC96563f843306Ff211eAa9B82Eb on the Ropsten test network.

# Setup

## .env
In the frontend folder. Create a .env file and add the following contents into it.

```
CONTRACT_ADDRESS=0x605411AE9739EC96563f843306Ff211eAa9B82Eb
ADDRESS=0xE96D950Aea9E079AC46401A0975f8400777f7773
PRIVATEKEY=87849a47d49f0d29c8de6171fd43b82b70b098ab8e05afadc45c184d65a24e9f
```

## NodeJS

This will run the web application to interact with the smart contract.

1. Install NodeJS
2. Navigate to the frontend folder
3. Run `npm i` to install all the dependencies
4. Run `npm run dev` to run the NextJS application

## Python

This will run the image generator

1. `pip install matplotlib`
2. Navigate to frontend/public
3. Run `python -m visualization.py`




