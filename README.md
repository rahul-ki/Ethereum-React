# Ethereum-React
Integrate a dApp with react to give it a front-end and talk with metamask

## How to work with it?
1. Ensure you have metamask
2. On command line `$ ganache-cli` to start your private ethereum blockchain
3. Use the seed words provided by ganache-cli to login to this metamask account.
3. On another command prompt, cd to `react_ethereum` and then `$ npm run start`. This starts the web-page at `localhost:3000`. The front-end was written solely with `React`.
4. Have fun playing around!

So basically, the dApp is deployed onto ganache-cli. The accounts in ganache-cli are synced with Metamask. Metamask injects web3, that the front-end uses to talk to our dApp and the blockchain. SO here 4 things are tlking to each other!

NOTE: To work with truffle develop, simply go to `truffle-config` file and make the following changes:
```
host: localhost
port: 9545
```

## The dApp
2 view functions that show the attributes `secret` and `state`. You can set a new state and then after about 15secons (the time it takes to carry out a transaction), hit the `Get State` button and you can see the state again.
I wanted to practise with events, so I added the next two buttons, that basically emit an event, and gives the result of the experiment (ie was the experiment successful or no).
