<template>
    <div class="main-background main-style">
        <div id="main-title">
            <p id="dapp-name">自由銀行</p>
            <p id="slogan">解放金融，拋棄中心化銀行</p>
            <p id="start-button">開始體驗</p>
        </div>
        <div id="main-info">
            <p class="some-info">透過本平台可以享受去中心化金融服務，使你的金流不在被銀行控管，只要有網路就可以進行交易</p>
            <p class="some-info">不需要任何中介或仲裁機構。</p>
            <p class="some-info">降低了提供及使用這些產品的相關成本，使金融體系更為順暢。</p>
        </div>
        <div id="warning-info">
            <p class="warning-some-info">警語</p>
            <p class="warning-some-info">請注意，此網站僅用於演示目的，不要將其視為真實環境。最終解釋權歸本網站所有。</p>
        </div>
    </div>
</template>

<style>
@font-face {
    font-family: Chen;
    src: url('../../../fontStyle/ChenYuluoyan-Thin.ttf');
}
* {
    padding: 0px;
    margin: 0px;
    font-size: 0.3vw;
    font-family: Chen;
}
.main-background {
    background-image: linear-gradient(to right top, #70D0D8, #6282DF, #D642F3);
}
</style>
<style scoped>
.main-style {
    height: 100vh;
    overflow: auto;
}

#main-title {
    display: flex;
    flex-direction: column;
    margin-top: 30rem;
}

#slogan, #dapp-name {
    color: white;
    text-shadow: 1px 3px 3px black;
    margin: 0 auto;
}

#dapp-name {
    font-size: 24rem;
    margin-bottom: 5rem;
    animation: dapp-name-show-translate 0.7s linear, 
    dapp-name-show-opacity 1s ease-in-out;
}
@keyframes dapp-name-show-translate {
    from {
        transform: translateY(-30rem);
    }
    to {
        transform: translateY(0px);
    }
}
@keyframes dapp-name-show-opacity {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

#slogan {
    font-size: 10rem;
    animation: info-show-translate 0.7s linear,
    info-show-opacity 1s ease-in-out forwards;
    opacity: 0;
    animation-delay: 1.2s;
    margin-bottom: 30rem;
}
@keyframes info-show-translate {
    from {
        transform: translateY(-15rem);
    }
    to {
        transform: translateY(0px);
    }
}
@keyframes info-show-opacity {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

#start-button {
    font-size: 12rem;
    margin: 0 auto;
    padding: 0.5rem 12rem;
    background-color: #12b9e6;
    color: white;
    text-align: center;
    line-height: 25rem;
    border-radius: 5rem;
    opacity: 0;
    animation: info-show-translate 0.7s linear,
    info-show-opacity 1s ease-in-out forwards;
    animation-delay: 1.7s;
    transition: all 0.2s;
    margin-bottom: 20rem;
}
#start-button:hover {
    cursor: pointer;
    background-color: #2aa5d3;
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0, 0.2);
}

#main-info {
    display: flex;
    flex-direction: column;
    opacity: 0;
    animation: info-show-opacity 0.5s linear forwards;
    animation-delay: 2.4s;
    margin-bottom: 20rem;
}

.some-info {
    font-size: 7rem;
    margin: 0 auto;
}

#warning-info {
    display: flex;
    flex-direction: column;
    opacity: 0;
    animation: info-show-opacity 0.5s linear forwards, 
    warning-change-color 1s infinite linear alternate;
    animation-delay: 2.5s;
    margin: 0 auto;
    width: 180rem;
    padding: 2rem 0rem;
    border: solid 2px black;
    border-radius: 5rem;
    margin-bottom: 10rem;
}
@keyframes warning-change-color {
    from {
        color: black;
        border-color: black;
    }
    to {
        color: red;
        border-color: red;
    }
}

.warning-some-info {
    font-size: 5rem;
    margin: 0 auto;
}
</style>