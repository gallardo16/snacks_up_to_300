#!/usr/bin/env node

const inquirer = require('inquirer')

const priceOfSnacks = {
  うまい棒: 10,
  ブラックサンダー: 31,
  ガブリチュウ: 31,
  龍角散: 257,
  タラタラしてんじゃねーよ: 54,
  都こんぶ: 102,
  蒲焼さん太郎: 12,
  チロルチョコ: 21,
  男梅梅干し: 192,
  アルフォート: 95,
  メンタルバランスチョコGABA: 159,
  アーモンドチョコ: 213,
  つぶグミ: 138,
  ピュレグミ: 116,
  ボタンアメ: 133,
  ハイチュウ: 95,
  マーブルチョコ: 123,
  チョコビ: 116,
  カムカムレモン: 127,
  スニッカーズ: 138,
  チョコボール: 79,
  メントス: 102,
  ポッキー: 138,
  たけのこの里: 181,
  コアラのマーチ: 95,
  チョコパイ: 267,
  キャラメルコーン: 95,
  ポテトチップス: 73,
  ピザポテトBIG: 300,
  じゃがりこ: 101
}

const snacksNames = Object.keys(priceOfSnacks)
const snacksPrices = Object.values(priceOfSnacks)
const snacksNamesAndPrices = []
snacksNames.forEach((snack) => {
  snacksNamesAndPrices.push(`${snack}: ${priceOfSnacks[snack]}円`)
})

const questionOfSnacks =
  [{
    type: 'list',
    name: 'snack',
    message: 'お菓子を選んでね！',
    choices: snacksNamesAndPrices
  },
  {
    type: 'number',
    name: 'count',
    message: '何個買う？'
  }]

const questionOfNextAction =
  [{
    type: 'list',
    name: 'action',
    message: 'このまま買い物を続ける？',
    choices: ['続ける！', 'これで決めた！']
  }]

const cart = []
let sum = 0

const selectSnacks = () => {
  inquirer
    .prompt(questionOfSnacks)
    .then(answer => {
      if (isNaN(answer.count) || answer.count === 0) {
        console.log('1以上の数字を正しく入力してください！')
      } else {
        const snackIdx = snacksNamesAndPrices.indexOf(answer.snack)
        sum += answer.count * snacksPrices[snackIdx]
        cart.push([snacksNames[snackIdx], answer.count])
        console.log(`ただいまの合計は${sum}円`)
        if (sum > 300) {
          console.log(`${sum - 300}円分オーバー！`)
          return
        }
        inquirer
          .prompt(questionOfNextAction)
          .then(answer => {
            if (answer.action === 'これで決めた！') {
              console.log('買ったものは')
              for (const item of cart) {
                console.log(`${item[0]}:${item[1]}個`)
              }
              console.log(`合計金額:${sum}円`)
            } else {
              selectSnacks()
            }
          })
      }
    })
}

selectSnacks()
