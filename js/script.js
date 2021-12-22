const header = document.querySelector("header");

const setUpImages = images => {
    const imagesContainer = images.querySelector(".images_container");
    const margin = 10;

    for(let i = 1; i < imagesContainer.children.length; i++){
        imagesContainer.children[i].style.marginLeft = margin + "px";
    }

    const arrowLeft = images.querySelector(".arrow_left");
    const arrowRight = images.querySelector(".arrow_right")

    const showButtonsChecking = () => {
        if (imagesContainer.scrollLeft === 0) {
            arrowLeft.style.display = "none";
        } else {
            arrowLeft.style.display = "";
        }

        if (imagesContainer.scrollLeft + imagesContainer.clientWidth + 2 >= imagesContainer.scrollWidth) {
            arrowRight.style.display = "none";
        } else {
            arrowRight.style.display = "";
        }
    }
    const time = 500;

    const createCallbackEventListenerArrow = (isRightArrow) => {
        const space = imagesContainer.clientWidth + margin;

        imagesContainer.scrollBy({
            top: 0,
            left: isRightArrow ?space : -1 * space,
            behavior: 'smooth'
        });

        setTimeout(showButtonsChecking, time);
    }

    const disableEventListener = () => {
        arrowRight.removeEventListener("click", rightCallback);
        arrowLeft.removeEventListener("click", leftCallback);

        setTimeout(() => {
            arrowLeft.addEventListener("click", leftCallback);
            arrowRight.addEventListener("click", rightCallback);
        }, time);
    }

    const leftCallback = () => {
        createCallbackEventListenerArrow(false);
        disableEventListener();
    }

    const rightCallback = () => {
        createCallbackEventListenerArrow(true);
        disableEventListener();
    }

    arrowLeft.addEventListener("click", leftCallback);
    arrowRight.addEventListener("click", rightCallback);

    setTimeout(showButtonsChecking, time);
}

document.querySelectorAll(".console_images").forEach(setUpImages);

document.querySelector(".mobile_menu_button").addEventListener("click", () => {
    header.classList.toggle("open_menu");
});

const closeMobileMenuOnClickOutOfIt = (eventElement) => {
    if (eventElement.closest("header") === null) {
        header.classList.remove("open_menu");
    }
}

const emergeElements = () => {
    const elements = document.querySelectorAll(".pop_up_element:not(.emerge)");
    for (const el of elements) {
        if (el.getBoundingClientRect().top > document.documentElement.clientHeight) return;
        el.classList.add("emerge");
    }
}

const createConsoleTitle = (title) => {
    const divTitle = document.createElement("div");
    divTitle.classList.add("console_title");
    const h2 = document.createElement("h2");
    h2.textContent = title;
    divTitle.appendChild(h2);
    return divTitle;
}

const createArrowButtons = (isRight) => {
    const button = document.createElement("button");
    button.classList.add("image_arrow");
    button.classList.add(isRight ?"arrow_right" :"arrow_left");

    const img = document.createElement("img");
    img.src = isRight ?"./img/arrow-right.svg" :"./img/arrow-left.svg";
    img.alt = isRight ?"стрелка вправо" :"стрелка влево";

    button.appendChild(img);
    return button;
}

const createImages = (images, title) => {
    const divImages = document.createElement("div");
    divImages.classList.add("console_images");

    divImages.appendChild(createArrowButtons(false));
    divImages.appendChild(createArrowButtons(true));

    const divImagesContainer = document.createElement("div");
    divImagesContainer.classList.add("images_container");
    divImages.appendChild(divImagesContainer);

    images.forEach(image => {
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        divImagesContainer.appendChild(img);
    });
    return divImages;
}

const createText = (texts) => {
    const divTexts = document.createElement("div");
    divTexts.classList.add("console_text");

    texts.forEach(text => {
        const p = document.createElement("p");
        p.textContent = text;
        divTexts.appendChild(p);
    });
    return divTexts;
}

const createConsole = (title, images, texts) => {
    const divConsole = document.createElement("div");
    divConsole.classList.add("console");
    divConsole.classList.add("pop_up_element");

    divConsole.appendChild(createConsoleTitle(title));
    divConsole.appendChild(createImages(images, title));
    divConsole.appendChild(createText(texts));
    return divConsole;
}

const divConsoles = document.querySelector(".consoles");

const addConsole = () => {
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    if (window.pageYOffset + document.documentElement.clientHeight + 300 < scrollHeight) return;

    while (content.currentId < content.consoles.length &&
    !content.consoles[content.currentId].title.toLowerCase().includes(content.filter.toLowerCase())) {
    content.currentId++;
  }

    if (content.currentId > content.consoles.length - 1) return;

    let data = content.consoles[content.currentId],
      title = data.title,
      images = data.images,
      texts = data.texts;

    content.currentId++;

    const newConsole = createConsole(title, images, texts);
    divConsoles.appendChild(newConsole);
    setUpImages(newConsole);
}

window.addEventListener("click", (e)  => {
    closeMobileMenuOnClickOutOfIt(e.target);
});

window.addEventListener("scroll", () => {
    emergeElements();
    addConsole();
});

window.addEventListener("load", () => {
    emergeElements();
});