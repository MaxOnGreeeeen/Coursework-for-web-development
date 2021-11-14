/*Вариант 2
2.	Разработка скрипта «Количество обособленных регионов». Область задана прямоугольной матрицей,
состоящей из нулей и единиц. Подсчитайте количество разных регионов и верните результат.
Отдельный регион - это совокупность единиц,
связанных между собой по горизонтали и вертикали. В регионе могут быть пустые пространства.
  */
//function to create buttons
const executeFunction = () =>{

    const matrixContainer = document.getElementById("matrix-container");
    const table = document.getElementById("matrix");
    const inputData = document.getElementById("num1").value;
    const currentResult =  document.getElementById("result-1");
    //изменить принцип работы исключений
    if (inputData.length === 0) return false;

    view = (isTheCellChanged, idOfChangedCell) =>{

        //get the data from the user from our page
        //данная переменная будет основной для дальнейшей обработки
        let matrix;
        if (isTheCellChanged){
            matrix = [];
            let columns = document.querySelectorAll("#matrix tr");
            for (let i = 0; i < columns.length; i++){
                let row = columns[i];
                let rows = row.querySelectorAll('td');
                let str = [];
                for ( let j = 0; j < rows.length; j++) {
                    let td = rows[j];
                    if (td.id === idOfChangedCell){
                        if(td.innerHTML === "0") str.push("1");
                        else str.push("0");
                    }
                    else{str.push(td.innerHTML);}
                }matrix.push(str);
            }
        }else matrix = createMatrix(inputData);
        table.innerHTML = ""
        if ( matrix === undefined) return false;
        //проверка на правильность введённых данных
        const correctnessOfData = checkForInappropriateSymb(matrix);
        if (!correctnessOfData){
            currentResult.innerHTML =
                "Некорректно введены данные";
        }else{
            drawMatrix(matrix);
            console.log(matrix);
            const result = solve(matrix);
            //рисуем получившуюся матрицу
            currentResult.innerHTML = "Результат: " + result;
        }

    }
    //создаём матрицу из введенной строки в textarea
    const createMatrix = (inputData) => {
        let matrix = [];
        let string = "";
        let array = [];
        for (let i = 0; i < inputData.length; i++) {
            string = "";
            while (inputData.charAt(i) !== "\n" && i !== inputData.length) {
                string += inputData.charAt(i);
                i++;
            }if (i === inputData.length) {
                array = string.split(" ");
                matrix.push(array);
                return matrix;
            }else {
                array = string.split(" ");
                matrix.push(array);
            }
        }
    }
    //проверяем матрциу на следующие параметры:
    //матрциа является матрицей и при этом прямоугольной,
    //все символы в матрице - числовые,
    //символы равны 1 или 0
    const checkForInappropriateSymb = (matrix) => {
        if (matrix.length === 0) return false;
        let canonLength = matrix[0].length;
        //проверяем явялется ли матрица прямоугольной
        if (canonLength === matrix.length) {
            return false;
        } else {
            for (let element of matrix) {
                //проверям является ли элемент массивом
                if (typeof element === 'object') {
                    //проверяем имеют ли все элементы матрицы одинаковую длину
                    if (element.length === canonLength) {
                        //проверяем каждый элемент матрицы на значения 0 или 1
                        for (let elementOfArray of element) {
                            let check = parseInt(elementOfArray);
                            if (isNaN(check) || (check !== 0 && check !== 1)) return false;
                        }
                    } else return false;
                } else return false;
            }
            return true;
        }
    }
    //главная функция для решения поставленной задачи
    const solve = (matrix) => {
      let length = matrix[0].length;
      let height = matrix.length;
      let resultMatrix = [];
      //create new matrix contains only zeroes
      for ( let i = 0; i < height; i++){
            let tempArray = [];
            for ( let j = 0; j < length  ; j++){
              tempArray.push(0);
            }
        resultMatrix.push(tempArray);
      }
      let totalRegionCount = 0;
      //здесь происходит непонятная даже мне чертовщина
        let result;
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === "1" && resultMatrix[i][j] === 0) {

                    const color = randomColor();
                    colorizeElement(i, j, color);

                    totalRegionCount++;
                    resultMatrix[i][j] = 1;
                    result = whereToGo(matrix, resultMatrix, i, j);

                    if (result.length >= 1) {
                        for (let eachElem of result) {
                            resultMatrix = switchPossibleWays(eachElem, matrix,
                                resultMatrix, i, j, color);
                            if (resultMatrix === matrix) return totalRegionCount;//пересылаю на свитч
                        }
                    }
                }
            }
        }
      return totalRegionCount;
    }
    //create random color for cell
    const colorizeElement = (i, j, color) => {

        let elementId = i.toString() + "_" + j.toString();
        const elementToColor = document.getElementById(elementId);

        elementToColor.style.background = color;
    }
    const whereToGo = (matrix, resultMatrix,
       xPosition, yPosition) => {
       let returnString ="";
       //проверка свободно ли справа
       if (yPosition + 1 < matrix[xPosition].length){
         if ( matrix[xPosition][yPosition + 1] === "1" &&
         resultMatrix[xPosition][yPosition + 1] === 0){
         returnString += "1";
         }
       }
       //проверка свободно ли слева
       if (yPosition - 1 >= 0){
         if ( matrix[xPosition][yPosition - 1] === "1" &&
         resultMatrix[xPosition][yPosition - 1] === 0){
         returnString += "2";
         }
       }
       //проверка свободно ли сверху
       if (xPosition - 1 >= 0){
         if ( matrix[xPosition - 1][yPosition] === "1" &&
         resultMatrix[xPosition - 1][yPosition] === 0){
         returnString += "3";
         }
       }
       //проверка свободно ли снизу
       if (xPosition + 1 < matrix.length){
         if ( matrix[xPosition + 1][yPosition] === "1" &&
         resultMatrix[xPosition + 1][yPosition] === 0){
         returnString += "4";
         }
       }return returnString;
    }
    const switchPossibleWays = (switchValue,matrix, resultMatrix,
       xPosition, yPosition, color) => {
        //possible values for modifier
        const modifier = ["r","l","u","d"];
        switch (switchValue){
          case "1":
            resultMatrix = goModifierDirection(matrix, resultMatrix,
               xPosition, yPosition, modifier[0], color);
            break;
          case "2":
            resultMatrix = goModifierDirection(matrix, resultMatrix,
             xPosition, yPosition, modifier[1], color);
            break;
          case "3":
            resultMatrix = goModifierDirection(matrix, resultMatrix,
           xPosition, yPosition, modifier[2], color);
            break;
          case "4":
            resultMatrix = goModifierDirection(matrix, resultMatrix,
            xPosition, yPosition, modifier[3], color);
            break;
          case "":
            break;
          default:
            break;
      }
      return resultMatrix;
    }
    const goModifierDirection = (matrix, resultMatrix,
                                 xPosition, yPosition, modifier, color) => {
        switch (modifier) {
            case "r":
                yPosition++;
                break;
            case "l":
                yPosition -= 1;
                break;
            case "u":
                xPosition -= 1;
                break;
            case "d":
                xPosition += 1;
                break;
            default:
                break;
        }
        colorizeElement(xPosition, yPosition, color);
        resultMatrix[xPosition][yPosition] = 1;
        let result = whereToGo(matrix, resultMatrix, xPosition, yPosition);

        if (result.length > 1) {
            for (let eachElem of result) {
                switchPossibleWays(eachElem, matrix,
                    resultMatrix, xPosition, yPosition, color);//пересылаю на свитч
            }
        } else {
            switchPossibleWays(result, matrix,
                resultMatrix, xPosition, yPosition, color);
        }
        return resultMatrix;
    }
    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const drawMatrix = (matrix) => {

        const size = Math.ceil(checkBlockLength(matrix));
        for (let i = 0; i < matrix.length; i++ ){
            //create row
            let tr = document.createElement('tr');
            tr.setAttribute("id", i.toString());
            for (let j = 0; j < matrix[i].length; j++){

                const cellHeight =  size.toString() + "px";
                const cellWidth = size.toString() + "px";

                //create style for td element
                const getStyle = () => {

                    let td = document.createElement("td");
                    td.setAttribute("id", i.toString() +"_" + j.toString());
                    td.innerHTML = matrix[i][j];
                    td.classList.add("matrix-element");
                    td.style.height = cellHeight;
                    td.style.width = cellWidth;
                    td.style.fontSize = Math.ceil(size / 2).toString() + "px";

                    return td;
                }
                const td = getStyle();
                td.addEventListener("click", ()=>{
                    let targetId = td.id;
                    view(true, targetId);
                });
                tr.appendChild(td);

            }table.appendChild(tr);
        }
    }
    //find out the optimal size of one cell
    const checkBlockLength = (matrix) =>{

        const blockHeight = matrixContainer.offsetHeight;
        const blockWidth = matrixContainer.offsetWidth;

        const findTheAppropriateSize = (width, height) => {

            const amountOfBlocksColumn = matrix.length;
            const amountOfBlocksRows = matrix[0].length;

            const minHeight = height / amountOfBlocksColumn;
            const minWidth = width / amountOfBlocksRows;

            return Math.min(minHeight, minWidth);
        }
        return findTheAppropriateSize (blockWidth, blockHeight);
    }
    return view();
};
