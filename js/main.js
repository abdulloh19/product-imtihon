const elProductWrapper = document.querySelector(".product-wrapper");

const createElement = function(elName, className, text) {
    const createdElement = document.createElement(elName);
    createdElement.className = className;
    if (text) {
        createdElement.textContent = text
    }

    return createdElement;
};
const showDate = function(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;

    return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${date.getFullYear()}`;
};

const elProductTemplate = document.querySelector("#product-template");

const createProduct = function(product) {
    const { id, img, title, price, model, addedDate, benefits } = product;
    
    const elProductRow = elProductTemplate.cloneNode(true).content;
    const elProductImg = elProductRow.querySelector(".product-img");
    elProductImg.src = img;
    const elProductTitle = elProductRow.querySelector(".card-title");
    elProductTitle.textContent = title;
    const elProductPrice = elProductRow.querySelector(".card-text");
    elProductPrice.textContent = price;
    const elProductModel = elProductRow.querySelector(".product-price");
    elProductModel.textContent = model;
    const elProductDate = elProductRow.querySelector(".card-text");
    const AddedDate = new Date(addedDate);
    elProductDate.textContent = showDate(AddedDate)

    const elPorductBenefits = elProductRow.querySelector(".product-benefits");

    for (let i = 0; product.benefits.length; i++) {
        const elProductItem = createElement("li", "badge bg-primary me-1 mb-1", benefits[i]);
        elPorductBenefits.append(elProductItem)
    };

    const elProductEdit = elProductRow.querySelector(".btn-secondary");
    elProductEdit.dataset.id = id;
    const elProductDelete = elProductRow.querySelector(".btn-danger");
    elProductDelete.dataset.id = id;

    return elProductRow;
}

const elProductCount = document.querySelector(".product-count");

const productRender = function(productArray = products) {
    elProductCount.textContent = `Count: ${productArray.length}`;
    productArray.forEach(function(product) {
        const productItem = createProduct(product);
        elProductWrapper.append(productItem)
    });
}

productRender()