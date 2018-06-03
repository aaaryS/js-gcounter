GCounter CRDT example with web workers
===========

Simple javascript and web workers example for concurrency problem using GCounter algorithm. There are few counters and they should increment one grand value, so after few seconds they should all have same value.


### Getting Started

##### 1. Install & run project

```
yarn install
sudo npm start
```

Visit `http://localhost:8080`, you can test more counter by adding query param `http://localhost:8080?amount=9`

UI is working with amount from range 2-9, but logic can hold much more counters.

##### 2. Run tests

```
sudo npm test
```

##### 3. Live demo
http://maj.design/js-gcounter/