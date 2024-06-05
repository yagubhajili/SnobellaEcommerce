import { ProductURL } from "./baseURL.js";
import { getDatas } from "./request.js";
import { deleteById } from "./request.js";
import { getDataById } from "./request.js";
import { patchById } from "./request.js";
import { postDatas } from "./request.js";

const modal = document.querySelector(".modal-body");
const savechanges = document.querySelector(".savechanges");

async function createrow() {
    let Product = await getDatas(ProductURL);
    Product.forEach(element => {
        let tablebody = document.querySelector(".tablebody");

        const trow = document.createElement('tr');
        const tdid = document.createElement('td');
        const tdtitle = document.createElement('td');
        const price = document.createElement('td');
        const action = document.createElement('td');
        const buttondelete = document.createElement("button");
        const buttonedit = document.createElement("button");
        const buttonadd = document.createElement("button");
        const buttondetails = document.createElement("button");

        buttondelete.className = "btn btn-danger";
        buttonedit.className = "btn btn-primary ml-3";
        buttonadd.className = "btn btn-success ml-3";
        buttondetails.className = "btn btn-warning ml-3";

        action.className = "d-flex ";

        buttonedit.setAttribute("data-bs-toggle", "modal");
        buttonedit.setAttribute("data-bs-target", "#exampleModal");
        buttonedit.setAttribute("data-id", element.id);

        buttonadd.setAttribute("data-bs-toggle", "modal");
        buttonadd.setAttribute("data-bs-target", "#exampleModal");
        buttonadd.setAttribute("data-id", element.id);

        buttondetails.setAttribute("data-bs-toggle", "modal");
        buttondetails.setAttribute("data-bs-target", "#exampleModal");
        buttondetails.setAttribute("data-id", element.id);

        tdid.innerText = element.id;
        tdtitle.innerText = element.title;
        price.innerText = element.price;
        buttondelete.innerText = "Delete";
        buttonedit.innerText = "Edit";
        buttonadd.innerText = "Add";
        buttondetails.innerText="Details"


        tablebody.append(trow);
        trow.append(tdid, tdtitle, price, action);
        action.append(buttondelete, buttonedit, buttonadd,buttondetails);

        buttondelete.addEventListener('click', async () => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Element Silindi",
                showConfirmButton: false,
                timer: 1500
              });
            try {
                await deleteById(ProductURL, element.id);
                trow.remove();
                
                
            }
            catch (error) {
                alert("silinmedi");
            }
        });

        buttondetails.addEventListener("click" ,async (e)=>{
          let elem= await getDataById(ProductURL, e.target.getAttribute("data-id"));
          modal.innerHTML = `
                <p class="elemid">ID: ${elem.id}</p>
                <p class="elemtitle">Title: ${elem.title}</p>
                <p class="elemprice">price: ${elem.price}</p>
                <p class="elemimage">image: ${elem.image}</p>
                <p class="elemdescription">description: ${elem.description}</p>
                <p class="elemcategory">category: ${elem.category}</p>
                `
        })

        buttonedit.addEventListener('click', async (e) => {
            
            let elem = await getDataById(ProductURL, e.target.getAttribute("data-id"));

            modal.innerHTML = `
                <p class="elemid">ID: ${elem.id}</p>

                <label for="">Title: </label>
                <input class="elemtitle" type="text" value=${elem.title}>

                <label for="">Price: </label>
                <input class="elemprice" type="text" value=${elem.price}>

                <label for="">Img:</label>
                <input class="elemimage" type="text" value=${elem.image}>
                <br>

                <label for="">category: </label>
                <input class="elemcategory" type="text" value=${elem.category}>`;

        });
        buttonadd.addEventListener("click", async () => {
            modal.innerHTML = `
                <label for="addTitle">Title: </label>
                <input id="addTitle" class="addTitle" type="text">
                <label for="addPrice">Price: </label>
                <input id="addPrice" class="addPrice" type="text">
                <label for="addImage">Img:</label>
                <input id="addImage" class="addImage" type="text">
                <br>
                <label for="addCategory">Category: </label>
                <input id="addCategory" class="addCategory" type="text">

                <label for="adddescription">Description: </label>
                <input id="adddescription" class="adddescription" type="text">
                <button class="btn btn-success mt-3 save">Save</button>
            `;

            const saveNewProductButton = document.querySelector(".save");
            saveNewProductButton.addEventListener("click", async () => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Element Silindi",
                    showConfirmButton: false,
                    timer: 1500
                  });

                const addTitle = document.getElementById("addTitle").value;
                const addPrice = document.getElementById("addPrice").value;
                const addImage = document.getElementById("addImage").value;
                const addCategory = document.getElementById("addCategory").value;
                const adddescription = document.getElementById("adddescription").value;

                const newProduct = {
                    title: addTitle,
                    price: addPrice,
                    image: addImage,
                    category: addCategory,
                    description:adddescription
                };

                await postDatas(ProductURL, newProduct);
                createrow();
            });
        });

    });
}
createrow();

savechanges.addEventListener("click", async () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Element Silindi",
        showConfirmButton: false,
        timer: 1500
      });
    const id = document.querySelector(".elemid").innerText.split(":")[1].trim();
    const elemtitle = document.querySelector(".elemtitle");
    const elemprice = document.querySelector(".elemprice");
    const elemimage = document.querySelector(".elemimage");
    const elemcategory = document.querySelector(".elemcategory");

    let obj = await getDataById(ProductURL, id);

    obj.title = elemtitle.value;
    obj.price = elemprice.value;
    obj.image = elemimage.value;
    obj.category = elemcategory.value;

    await patchById(ProductURL, id, obj);
});
