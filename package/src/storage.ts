type OperationMethod = "get" | "set" | "remove" | "clear";

export const setInitStorage = <
  LocalStroage extends { [key: string]: any },
  SessionStroage extends { [key: string]: any }
>(
  init: {
    local: LocalStroage;
    session: SessionStroage;
  },
  option: { defaultUseInit: boolean } = {
    defaultUseInit: false,
  }
) => {
  let INIT_LOCAL_STORAGE = init.local;
  let INIT_SESSION_STORAGE = init.session;
  const getStorageItemFunction = <
    InitStorage extends { [key: string]: any },
    Method extends OperationMethod
  >(
    object: Storage,
    action: Method,
    init_storage: InitStorage
  ) => {
    const funcMap = {
      get: <T extends keyof InitStorage, GetExtends extends boolean>(
        item: T,
        ifNullIsGetInit?: GetExtends
      ): GetExtends extends true ? InitStorage[T] : InitStorage[T] | null => {
        const isGetInit =
          ifNullIsGetInit === undefined
            ? option.defaultUseInit
            : ifNullIsGetInit;
        let local: any = null;
        if (typeof window !== "undefined") {
          const item_string = object.getItem(item as string);
          if (item_string) {
            try {
              local = JSON.parse(item_string);
            } catch (err) {
              console.log(err);
            }
          } else if (isGetInit) {
            local = init_storage[item];
          }
        }
        return local;
      },
      set: <T extends keyof InitStorage>(
        item: T,
        value: (typeof init_storage)[T]
      ): void => {
        if (typeof window !== "undefined") {
          object.setItem(item as string, JSON.stringify(value));
        }
      },
      remove: <T extends keyof InitStorage>(item: T): void => {
        if (typeof window !== "undefined") {
          object.removeItem(item as string);
        }
      },
      clear: (): void => {
        if (typeof window !== "undefined") {
          object.clear();
        }
      },
    };
    return funcMap[action];
  };

  const getLocalStorageItem = getStorageItemFunction(
    localStorage,
    "get",
    INIT_LOCAL_STORAGE
  );
  const setLocalStorageItem = getStorageItemFunction(
    localStorage,
    "set",
    INIT_LOCAL_STORAGE
  );
  const removeLocalStorageItem = getStorageItemFunction(
    localStorage,
    "remove",
    INIT_LOCAL_STORAGE
  );
  const clearLocalStorageItem = getStorageItemFunction(
    localStorage,
    "clear",
    INIT_LOCAL_STORAGE
  );
  const getSessionStorageItem = getStorageItemFunction(
    sessionStorage,
    "get",
    INIT_SESSION_STORAGE
  );
  const setSessionStorageItem = getStorageItemFunction(
    sessionStorage,
    "set",
    INIT_SESSION_STORAGE
  );
  const removeSessionStorageItem = getStorageItemFunction(
    sessionStorage,
    "remove",
    INIT_SESSION_STORAGE
  );
  const clearSessionStorageItem = getStorageItemFunction(
    sessionStorage,
    "clear",
    INIT_SESSION_STORAGE
  );
  return {
    getLocalStorageItem,
    setLocalStorageItem,
    removeLocalStorageItem,
    clearLocalStorageItem,
    getSessionStorageItem,
    setSessionStorageItem,
    removeSessionStorageItem,
    clearSessionStorageItem,
  };
};
