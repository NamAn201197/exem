/*
    Lấy dữ liệu từ local storage
 */
let database = JSON.parse(localStorage.getItem("courseData"));

/*
    Render:
*/
let tbody = document.getElementById("tbody");

function render(data) {
  tbody.innerHTML = "";

  for (let index in data) {
    let activeStatus = "";
    if (data[index].status === true) {
      activeStatus = `Hoạt động`;
    } else {
      activeStatus = `Không hoạt động`;
    }

    // tạo tr
    let tr = `<tr>
                        <td>${+index + 1}</td>
                        <td>${data[index].class}</td>
                        <td>${data[index].name}</td>
                        <td>${data[index].time}</td>
                        <td>${activeStatus}</td>
                        <td class="actions">
                          <button class="change" id="change">Sửa</button>
                          <button class="delete" id="delete">Xóa</button>
                        </td>
                      </tr>`;
    tbody.innerHTML = tbody.innerHTML + tr;
  }
}
render(database);

/*
    Tính năng tìm kiếm
*/
let searchInput = document.getElementById("searchBar");
let searchButton = document.getElementById("searchBy");
//
searchButton.addEventListener("click", function () {
  let query = searchInput.value;
  let result = [];

  // Vòng lặp tìm kiếm trong database
  for (let i = 0; i < database.length; i++) {
    if (
      database[i].name.indexOf(query) !== -1 ||
      database[i].class.indexOf(query) !== -1
    ) {
      result.push(database[i]);
    }
  }
  render(result);
});

/*
    Tính năng sắp xếp dữ liệu
 */
let sortOption = document.getElementById("sortOption");
// gắn sự kiện
sortOption.addEventListener("change", function () {
  let sortValue = sortOption.value;
  if (sortValue === "2") {
    //Tăng dần
    database.sort((a, b) => {
      let numberA = parseInt(a.name.substring(9));
      let numberB = parseInt(b.name.substring(9));
      return numberB - numberA;
    });
  } else if (sortValue === "1") {
    //Giảm dần
    database.sort((a, b) => {
      let numberA = parseInt(a.name.substring(9));
      let numberB = parseInt(b.name.substring(9));
      return numberA - numberB;
    });
  }
  render(database);
});

/*
    Tính Năng Thêm Mới
*/
// button
let btnAddNew = document.getElementById("addNewBtn");
let newForm = document.getElementById("formAddNew");
let btnClose = document.getElementById("btnClose");
// Gọi form
let form = document.getElementById("form"); 

// mở from
btnAddNew.addEventListener("click", function () {
  newForm.classList.remove("open-form");
});
// đóng
btnClose.addEventListener("click", function () {
  newForm.classList.add("open-form");
});

//lấy dữ liệu trạng thái từ input radio
function radioValue() {
  let selectedRadio = document.querySelector('input[name="status"]:checked');

  if (selectedRadio.value === "Hoạt động") {
    return true;
  } else {
    return false;
  }
}

// Hàm lấy dữ liệu thêm mới
form.onsubmit = function (event) {
  event.preventDefault();

  let userStatus = radioValue();
//   console.log("User Status:", userStatus);

  let courseNew = {
    id: Math.random(),
    class: form.class.value,
    name: form.name.value,
    time: form.time.value,
    status: userStatus,
  };

  database.push(courseNew);
  render(database);
  newForm.classList.add("open-form");
};

/*
    Tính năng cập nhập
*/
// call button
