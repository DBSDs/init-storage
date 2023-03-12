import { setInitStorage } from "../package/";

const INIT = {
  local: {},
  session: { token: "1" },
};

test("getSessionStorageItem", async () => {
  const { getSessionStorageItem } = setInitStorage(INIT);
  expect(getSessionStorageItem("token")).toEqual(null);
  expect(getSessionStorageItem("token", true)).toEqual("1");

  window.sessionStorage.setItem("token", JSON.stringify("123"));
  expect(getSessionStorageItem("token")).toEqual("123");
  expect(getSessionStorageItem("token", true)).toEqual("123");

  window.sessionStorage.removeItem("token");
  expect(getSessionStorageItem("token")).toEqual(null);
  expect(getSessionStorageItem("token", true)).toEqual("1");
});

test("setSessionStorageItem", async () => {
  const { setSessionStorageItem } = setInitStorage(INIT);
  expect(JSON.parse(window.sessionStorage.getItem("token") as string)).toEqual(
    null
  );

  setSessionStorageItem("token", "1");
  expect(JSON.parse(window.sessionStorage.getItem("token") as string)).toEqual(
    "1"
  );
});

test("removeSessionStorageItem", async () => {
  const { removeSessionStorageItem } = setInitStorage(INIT);
  window.sessionStorage.setItem("token", JSON.stringify("123"));
  expect(JSON.parse(window.sessionStorage.getItem("token") as string)).toEqual(
    "123"
  );
  removeSessionStorageItem("token");
  expect(JSON.parse(window.sessionStorage.getItem("token") as string)).toEqual(
    null
  );
});

test("clearSessionStorageItem", async () => {
  const { clearSessionStorageItem } = setInitStorage(INIT);
  window.sessionStorage.setItem("token", JSON.stringify("123"));
  window.sessionStorage.setItem("token2", JSON.stringify("321"));
  expect(JSON.parse(window.sessionStorage.getItem("token") as string)).toEqual(
    "123"
  );
  expect(JSON.parse(window.sessionStorage.getItem("token2") as string)).toEqual(
    "321"
  );

  clearSessionStorageItem();
  expect(JSON.parse(window.sessionStorage.getItem("token") as string)).toEqual(
    null
  );
  expect(JSON.parse(window.sessionStorage.getItem("token2") as string)).toEqual(
    null
  );
});
