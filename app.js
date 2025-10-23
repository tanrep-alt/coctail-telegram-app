// Данные о коктейлях
const cocktails = {
    "1": {
        name: "Пина Колада",
        description: "Тропический коктейль на основе рома, кокосового молока и ананасового сока.",
        ingredients: [
            "50 мл белого рома",
            "50 мл кокосового молока",
            "100 мл ананасового сока",
            "15 мл сливок",
            "Лёд",
            "Долька ананаса для украшения"
        ],
        preparation: "Смешайте все ингредиенты в шейкере со льдом. Хорошо взбейте и процедите в бокал хайбол, наполненный дроблёным льдом. Украсьте долькой ананаса."
    },
    "2": {
        name: "Негрони",
        description: "Классический итальянский коктейль с горьковатым вкусом.",
        ingredients: [
            "30 мл джина",
            "30 мл красного вермута",
            "30 мл кампари",
            "Апельсиновая цедра для украшения"
        ],
        preparation: "Наполните старый модный бокал (рокс) крупными кубиками льда. Налейте все ингредиенты прямо в бокал. Аккуратно перемешайте. Украсьте апельсиновой цедрой."
    },
    "3": {
        name: "Мохито",
        description: "Освежающий кубинский коктейль на основе белого рома, мяты и лайма.",
        ingredients: [
            "50 мл белого рома",
            "6-8 листиков мяты",
            "30 мл сока лайма",
            "2 ч.л. сахара",
            "Содовая",
            "Лёд",
            "Ломтики лайма для украшения"
        ],
        preparation: "В высоком бокале хайбол разомните мяту с сахаром и соком лайма. Добавьте ром и наполните бокал дроблёным льдом. Долейте содовую и аккуратно перемешайте. Украсьте ломтиком лайма и веточкой мяты."
    }
};

// Инициализация Telegram Web App
let tg = window.Telegram.WebApp;
tg.expand();
tg.MainButton.textColor = "#FFFFFF";
tg.MainButton.color = "#2cab37";

let selectedCocktail = "";
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const usercard = document.getElementById("usercard");

// Обработчики кнопок
btn1.addEventListener("click", function() {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Информация о Пина Коладе");
        selectedCocktail = "1";
        tg.MainButton.show();
    }
});

btn2.addEventListener("click", function() {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Информация о Негрони");
        selectedCocktail = "2";
        tg.MainButton.show();
    }
});

btn3.addEventListener("click", function() {
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
    } else {
        tg.MainButton.setText("Информация о Мохито");
        selectedCocktail = "3";
        tg.MainButton.show();
    }
});

// Обработчик главной кнопки
Telegram.WebApp.onEvent("mainButtonClicked", function() {
    tg.sendData(selectedCocktail);
});

// Функция отображения информации о коктейле
function showCocktailInfo(cocktailId) {
    const cocktail = cocktails[cocktailId];
    
    let ingredientsList = "";
    cocktail.ingredients.forEach(ingredient => {
        ingredientsList += <li>${ingredient}</li>;
    });
    
    usercard.innerHTML = `
        <div class="cocktail-info">
            <h3>${cocktail.name}</h3>
            <p><strong>Описание:</strong> ${cocktail.description}</p>
            <p><strong>Ингредиенты:</strong></p>
            <ul>${ingredientsList}</ul>
            <p><strong>Приготовление:</strong> ${cocktail.preparation}</p>
        </div>
        <button class="close-btn" id="closeBtn">Закрыть</button>
    `;
    
    usercard.style.display = "block";
    
    // Обработчик кнопки закрытия
    document.getElementById("closeBtn").addEventListener("click", function() {
        usercard.style.display = "none";
        tg.MainButton.hide();
    });
}

// Эмуляция для тестирования вне Telegram
if (typeof window.Telegram === 'undefined') {
    window.Telegram = {
        WebApp: {
            expand: function() { console.log("Telegram Web App expanded"); },
MainButton: {
                textColor: "#FFFFFF",
                color: "#2cab37",
                isVisible: false,
                show: function() { 
                    this.isVisible = true; 
                    console.log("Main button shown");
                    // Для тестирования сразу показываем информацию
                    showCocktailInfo(selectedCocktail);
                },
                hide: function() { 
                    this.isVisible = false; 
                    console.log("Main button hidden");
                },
                setText: function(text) { 
                    console.log("Main button text set to: " + text); 
                }
            },
            onEvent: function(event, callback) {
                if (event === "mainButtonClicked") {
                    this.mainButtonClicked = callback;
                }
            },
            sendData: function(data) {
                console.log("Data sent to Telegram: " + data);
                showCocktailInfo(data);
            }
        }
    };
    tg = window.Telegram.WebApp;
}
