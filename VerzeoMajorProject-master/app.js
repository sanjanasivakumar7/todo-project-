// For diplaying All the listed Todo's :-
function getAndUpdate() {
    console.log("Updating List...")

    let inputs = document.getElementById("inputTodo");
    let inputTodo = inputs.value;
    let selecting = document.getElementById("selecting").value;

    if (!inputTodo) {
        alert("Todo statement cannot be empty.");
    }
    else {
        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([inputTodo, selecting]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }
        else {
            itemJsonArraystr = localStorage.getItem('itemsJson')
            itemJsonArray = JSON.parse(itemJsonArraystr);
            itemJsonArray.push([inputTodo, selecting]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
        }
        inputs.value = "";
        update();
    }
}
function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArraystr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArraystr);
    }
    let carding = document.getElementById("carding");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
                <div class="card col-12 col-md-4"" style="width:18rem; height:300px; padding:10px; margin:10px;">
                    <div class="card-body >
                        <h5 class="card-title" style="font-weight: bold;">S No.- ${index + 1}</h5>
                        <hr>
                        <h6 class="card-subtitle mb-2 text-muted">${element[1]}</h6>
                        <hr>
                        <p class="card-text" style="font-weight: bold;">${element[0]}</p>
                        <hr>
                        <button class="btn btn-primary btn-sm DelBtn" onclick="deleteIt(${index})"><i class="fas fa-trash-alt fa-lg"></i></button>  
                    </div>
                </div>`;
    });
    carding.innerHTML = str;
}
submitingTodo = document.getElementById("submitingTodo");
submitingTodo.addEventListener("click", getAndUpdate);
update();

// For displaying the Todo's based on priority
let cards = document.getElementsByClassName("card");
document.getElementById('lowPriority').addEventListener('click', function () {
    Array.from(cards).forEach(function (element, index) {
        if (itemJsonArray[index][1] != "Low") {
            element.style.display = "none";
        }
        else {
            element.style.display = "block";
            element.style.backgroundColor = "rgb(56, 233, 71)";
        }
    })
})
document.getElementById('mediumPriority').addEventListener('click', function () {
    Array.from(cards).forEach(function (element, index) {
        if (itemJsonArray[index][1] != "Medium") {
            element.style.display = "none";
        }
        else {
            element.style.display = "block";
            element.style.backgroundColor = "#f8c427";
        }
    })
})
document.getElementById('highPriority').addEventListener('click', function () {
    Array.from(cards).forEach(function (element, index) {
        if (itemJsonArray[index][1] != "High") {
            element.style.display = "none";
        }
        else {
            element.style.display = "block";
            element.style.backgroundColor = "rgb(233, 71, 71)";
            element.style.color = "white";
        }
    })
})
// function for delete todo's
function deleteIt(itemIndex) {
    itemJsonArraystr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArraystr);

    itemJsonArray.splice(itemIndex, 1);

    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

