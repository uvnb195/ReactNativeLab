const class1 = [
  {
    mssv: "PS0000",
    name: "Nguyen Van A",
    avgPoint: 8.9,
    avgTraningPoint: 7,
    status: "pass",
  },
  {
    mssv: "PS0001",
    name: "Nguyen Van B",
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: "pass",
  },
];
const class2 = [
  {
    mssv: "PS0002",
    name: "Nguyen Van C",
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: "failed",
  },
  {
    mssv: "PS0003",
    name: "Nguyen Van D",
    avgPoint: 10,
    avgTraningPoint: 10,
    status: "pass",
  },
  {
    mssv: "PS0004",
    name: "Nguyen Van E",
    avgPoint: 10,
    avgTraningPoint: 2,
    status: "pass",
  },
];

//Bài 1

function sortArr(arr, prop) {
  return arr
    .slice(0)
    .sort((a, b) => {
      return a[prop] - b[prop];
    })
    .reverse();
}

const students = [...class1, ...class2].filter(
  (student) => student.status !== "failed"
);
const avgRanks = sortArr(students, "avgPoint");
const avgTrainingRanks = sortArr(students, "avgTraningPoint");
console.log(`Ong Vàng Điểm Cao Nhất: `, avgRanks[0]);
console.log(`Ong Vàng Điểm Rèn Luyện Cao Nhất:`, avgTrainingRanks[0]);

//Bài 2

const oldData = [
  { code: "ab", name: "Son môi" },
  { code: "ac", name: "Sữa rửa mặt" },
  { code: null, name: null },
  { code: null, name: "" },
];

const checkNullOrBlank = (obj) =>
  obj.code != null && obj.code != "" && obj.name != null && obj.name != "";

const parseArrToObj = (arr) => {
  const filterData = arr
    .filter((item) => checkNullOrBlank(item))
    .map((item) => [item.code, item.name]);

  return Object.fromEntries(filterData);
};
console.log(parseArrToObj(oldData));

// Bài 3

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Error: some Bug");
  }, 2000);
});

const getList = async () => {
  await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  //   https://64d8a86c5f9bf5b879ce6dd9.mockapi.io/api/v1/moviewsNow
};

//  Yêu cầu 1
Promise.all([promise1, promise2, getList()])
  .then((result) => console.log(`Success ${result}`))
  .catch((error) => console.log(`Error: ${error}`));

//   Yêu cầu 2
Promise.allSettled([promise1, promise2, getList()])
  .then((results) => {
    const hasFailure = results.some((result) => result.status === "rejected");
    if (hasFailure) console.log(`Có yêu cầu đã thất bại`);
    else console.log(`Tất cả Promise đều thành công`);
  })
  .catch((error) => console.log("Lỗi không xác định."))
  .finally(() => console.log("Đã hoàn thành tất cả Promise"));
