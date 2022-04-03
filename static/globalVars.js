const root = document.querySelector(".root");
var host = location.origin.replace(/^http/, "ws");
let ws = new WebSocket(host);

let mousedown = false;
let phase = 3;

let counter;
let listeners = [];
let selected = [];
let boxes;
const gameStatus = document.querySelector(".gameStatus");
const gameOver = document.querySelector(".gameOver");
const gameInfo = document.querySelector(".gameInfo");
let tableId;
