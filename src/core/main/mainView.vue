<template>
    <div class="main-background main-style">
        <div>
            <p id="dapp-name">自由銀行</p>
            <p id="slogan">解放金融，拋棄中心化銀行</p>
        </div>
    </div>
</template>

<style>
* {
    padding: 0px;
    margin: 0px;
    font-size: 0.2vw;
}
.main-background {
    background-image: linear-gradient(to right top, #70D0D8, #6282DF, #D642F3);
}
</style>
<style scoped>
.main-style {
    height: 100vh;
}

#slogan, #dapp-name {
    color: white;
    text-shadow: 1px 3px 3px black;
}

#dapp-name {
    font-size: 28rem;
}

#slogan {
    font-size: 12rem;
}
</style>