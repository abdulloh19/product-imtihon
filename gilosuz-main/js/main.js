elProductWrapper = document.querySelector("ul");
elProductWrapper.className = "row list-unstyled g-3";

const createElement = function(tagName, className, text) {
    const createdElement = document.createElement(tagName)
    createdElement.className = className;

    if(text) {
        createdElement.textContent = text;
    }

    return createdElement;
};

const renderProduct = function(product) {

    const elProduct = createElement("li", "col-4");
    const elProductCard = createElement("div", "card");
    const elProductImg = createElement("img", "card-img-top")
    elProductImg.src = product.img;
    const elProductBody = createElement("div", "card-body");
    const elProductTitle = createElement("h3", "card-title", product.title);
    const elProductPrice = createElement("p", "card-text fw-bold");
    const elProductMark = createElement("mark");
    elProductMark.textContent = product.price;
    elProductPrice.append(elProductMark);
    const elProductModel = createElement("p", "badge bg-success", product.model);
    const addedDate = new Date(product.addedDate);
    const elProductData = createElement("p", "card-text", `${addedDate.getDate()}.${(addedDate.getMonth() + 1)}.${addedDate.getFullYear()}`);
    
    const elProductlist = createElement("ul", "d-flex flex-wrap list-unstyled");

    for(let j = 0; j < product.benefits.length; j++) {
        const elProductBenefits = createElement("li", "badge bg-primary me-1 mb-1", product.benefits[j]);
        elProductlist.append(elProductBenefits)
    };

    const elProductButtonWrapper = createElement("div", "position-absolute top-0 end-0 d-flex");
    const elProductEdit = createElement("button", "btn rounded-0 btn-secondary");
    elProductEdit.dataset.bsTogle = "modal";
    elProductEdit.dataset.bsTarget = "edit-product-modal";
    elProductEdit.dataset.id = product.id;
    const elProductEditIcons = createElement("i", "fa-solid fa-pen");
    elProductButtonWrapper.append(elProductEdit);
    elProductEdit.append(elProductEditIcons);

    const elProductDelete = createElement("button", "btn rounded-0 btn-danger");
    elProductDelete.dataset.id = product.id;
    const elProductDeleteIcons = createElement("i", "fa-solid fa-trash");
    elProductButtonWrapper.append(elProductDelete);
    elProductDelete.append(elProductDeleteIcons);

    elProduct.append(elProductCard);
    elProductCard.append(elProductImg);
    elProductCard.append(elProductBody);
    elProductBody.append(elProductTitle);
    elProductBody.append(elProductPrice);
    elProductBody.append(elProductModel);
    elProductBody.append(elProductData);
    elProductBody.append(elProductlist);
    elProductBody.append(elProductButtonWrapper);

    return elProduct;
}

const productRender = function(filterArray = products) {
    filterArray.forEach(function(product){
        const elProduct = renderProduct(product)
        elProductWrapper.append(elProduct)
    });
}

const addForm = document.querySelector("#add-form");
const elAddTitleInput = document.querySelector("#product-title");
const elAddPriceInput = document.querySelector("#price");
const elAddBnefits = document.querySelector("#benefits");
const elAddManufacturer = document.querySelector("#product-manufacturer");
const elEditSelectInput = document.querySelector("#edit-product-manufacturer");


productRender()

for(let k = 0; k < manufacturers.length; k++) {
    const manufacturerOption = createElement("option", "", manufacturers[k].name);
    const editManufacturer = createElement("option", "", manufacturers[k].name);
    elEditSelectInput.append(editManufacturer);
    elAddManufacturer.append(manufacturerOption);
};

addForm.addEventListener("submit", function(evt){
    evt.preventDefault();

    const titleValue = elAddTitleInput.value;
    const priceValue = elAddPriceInput.value;
    const manufacturerValue = elAddManufacturer.value;
    const benefitsValue = elAddBnefits.value;

    if (titleValue && priceValue && manufacturerValue && benefitsValue) {
        const addProduct = {
            title: titleValue,
            img: "https://picsum.photos/300/200",
            price: priceValue,
            model: manufacturerValue,
            benefits: benefitsValue.split(","),
            addedDate: new Date().toISOString()
        }

        products.push(addProduct);
        const elProduct = renderProduct(addProduct);

        elProductWrapper.append(elProduct)
        addForm.reset()
    }

}) 

const editForm = document.querySelector("#edit-product-form")
const elEditTitleInput = document.querySelector("#edit-product-title");
const elEditPriceInput = document.querySelector("#edit-price");
const elEditManufacturer = document.querySelector("#edit-product-manufacturer")
const elEditBenfitsInput = document.querySelector("#edit-benefits");

elProductWrapper.addEventListener("click", function(evt) {
    if(+evt.target.matches(".btn-danger")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnIndex = products.findIndex(function(product) {
            return product.id === clickedBtnId
        })
        products.splice(clickedBtnIndex, 1)
        elProductWrapper.innerHTML = "";
        productRender()
    }

    if(+evt.target.matches(".btn-secondary")) {
        const clickedBtnId = +evt.target.dataset.id;
        const clickedBtnElement = products.find(function(product) {
            return product.id === clickedBtnId
        })
        elEditTitleInput.value = clickedBtnElement.title;
        elEditPriceInput.value = clickedBtnElement.price;
        elEditManufacturer.value = clickedBtnElement.model;
        elEditBenfitsInput.value = clickedBtnElement.benefits;

        editForm.dataset.id = clickedBtnId
    }
})

editForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const editTitleVal = elEditTitleInput.value;
    const editPriceVal = elEditPriceInput.value;
    const editSelcetVal = elEditManufacturer.value;
    const ediBenefits = elEditBenfitsInput.value;

    if(editTitleVal && editPriceVal && editSelcetVal && ediBenefits) {
        
        const editingProduct = {
            id: +evt.target.dataset.id,
            img: "https://picsum.photos/300/200",
            title: elAddTitleInput.value,
            price: elEditPriceInput.value,
            model: elEditManufacturer.value,
            addedDate: new Date().toISOString(),
            benefits: elEditBenfitsInput.value.split(",")
        }

        const editIndex = products.findIndex(function(product) {
            return editingProduct.id === product.id;
        })
        products.splice(editIndex, 1, editingProduct);
        elProductWrapper.innerHTML = "";
        productRender()
    };

})

const elForm = document.querySelector("#form");
const elSearchInput = document.querySelector("#search");
const elFromInput = document.querySelector("#from");
const elToInput = document.querySelector("#to");

elForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    const searchValue = elSearchInput.value;
    const fromValue = elFromInput.value;
    const toValue = elToInput.value;

    let filtredProduct = products.filter(function(product) {
        return product.title.toLowerCase().includes(searchValue.toLowerCase());
    }).filter(function(product) {
        return product.price >= fromValue;
    }).filter(function(product) {
        return product.price <= toValue
    })

    elProductWrapper.innerHTML = "";
    productRender(filtredProduct)
})

