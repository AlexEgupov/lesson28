//Создание функции filterByType, которая принимает тип данных и переменные, фильтрация каждой переменной по типу данных
const filterByType = (type, ...values) => values.filter(value => typeof value === type),

	//Создание функции hideAllResponseBlocks
	hideAllResponseBlocks = () => {
		//Создание неизменняемой переменной responseBlocksArray, значением которой является массив данных, созданный из элементов div.dialog__response-block
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//Перебор массива responseBlocksArray и скрытие каждого элемента со страницы
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	//Создание функции showResponseBlock, принимающей перменные blockSelector, msgText, spanSelector, которая выводит результат на эуран
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//Вызов функции hideAllResponseBlocks, скрывающей введенные данные
		hideAllResponseBlocks();
		//Делает blockSelector видимым
		document.querySelector(blockSelector).style.display = 'block';
		//Цикл, c условием если spanSelector = true, то его textContent = msgText
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	//Создание функции showError, принимающей переменную msgText, и запускающей функцию showResponseBlock
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	//Создание функции showResults, принимающей переменную msgText, и запускающей функцию showResponseBlock
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

	//Создание функции showResults, запускающей функцию showResponseBlock
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

	//Создание функции tryFilterByType, принимабщей переменные type и values
	tryFilterByType = (type, values) => {
		//Создание конструкции try catch
		try {
			//Создание переменной valuesArray, которая вызывает filterByType и разделяется все элементы  запятой с пробелом
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//Создание перменной alertMsg, в которую передается длина valuesArray, которая с помощью тернарного оператора
			//выводит сообщение или с типом данных с подходящими занчениями или то что данные выбранного тип аотсутсвуют
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//Вызов функции showResults со значением alertMsg
			showResults(alertMsg);
			//Отлов ошибок, вызывает функцию showError
		} catch (e) {
			showError(`Ошибка: ${e}`);
		}
	};

//Получение кнопки #filter-btn со страницы
const filterButton = document.querySelector('#filter-btn');

//Добавление слушателя с действием по клику на filterButton
filterButton.addEventListener('click', e => {
	//Получение селекта с id #type со страницы
	const typeInput = document.querySelector('#type');
	//Получение инпута с id #data со страницы
	const dataInput = document.querySelector('#data');

	//Проверка на наличие введенных данных
	//Если поля ввода пустое то выводится оповещение с текстом 'Поле не должно быть пустым!' в инпуте и вызывается функция showNoResults();
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
		//В любом другом случае такого оповещения не выводится, убирается выполнение действия по умолчанию, и запускается функция tryFilterByType,
		//которая принимает значения typeInput и dataInput с удаленными пробелами по и после методом .trim()
	} else {
		dataInput.setCustomValidity('');
		e.preventDefault();
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

