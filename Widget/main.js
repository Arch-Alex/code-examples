const main = document.getElementById("main");

async function getInfo() {
  const res = await fetch(
    "https://search-api.fie.future.net.uk/widget.php?id=review&model_name=nintendo_switch&area=GB"
  ).catch((err) => console.log(err));

  const stuff = await res.json();

  for (let i = 0; i < stuff.widget.data.offers.length; i++) {
    const newProductSection = document.createElement("section");
    newProductSection.setAttribute("id", "product" + i);
    newProductSection.setAttribute("class", "container");

    const productImage = document.createElement("section");
    productImage.setAttribute("id", "pImage" + i);

    const productName = document.createElement("h1");
    productName.setAttribute("id", "pName" + i);

    const merchantContainer = document.createElement("section");
    merchantContainer.setAttribute("id", "merchantContainer" + i);
    merchantContainer.setAttribute("class", "merchant");

    const merchantName = document.createElement("h3");
    merchantName.setAttribute("id", "merchantName" + i);

    const merchantLogo = document.createElement("section");
    merchantLogo.setAttribute("id", "merchantLogo" + i);

    const priceContainer = document.createElement("section");
    priceContainer.setAttribute("id", "priceContainer" + i);
    priceContainer.setAttribute("class", "price");

    const priceOffer = document.createElement("span");
    priceOffer.setAttribute("id", "priceOffer" + i);

    const priceValue = document.createElement("h4");
    priceValue.setAttribute("id", "priceValue" + i);

    main.append(newProductSection);
    newProductSection.append(
      productImage,
      productName,
      merchantContainer,
      priceContainer
    );
    merchantContainer.append(merchantName, merchantLogo);
    priceContainer.append(priceOffer, priceValue);

    document.getElementById("pImage" + i).innerHTML =
      "<img src = " + stuff.widget.data.offers[i].image + ">";

    document.getElementById("pName" + i).innerText =
      stuff.widget.data.offers[i].offer.name;

    document.getElementById("merchantName" + i).innerHTML =
      "<a href =" +
      stuff.widget.data.offers[i].offer.link +
      "> View at " +
      stuff.widget.data.offers[i].merchant.name +
      "</a>";

    document.getElementById("merchantLogo" + i).innerHTML =
      "<img src =" + stuff.widget.data.offers[i].merchant.logo_url + ">";

    document.getElementById("priceOffer" + i).innerText =
      "Best price on offer:";

    document.getElementById("priceValue" + i).innerText =
      stuff.widget.data.offers[i].offer.price +
      " " +
      stuff.widget.data.offers[i].offer.currency_iso;
  }

  console.log(stuff);
}

getInfo();
