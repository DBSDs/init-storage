export const setInitStorage = <
  LocalStroage extends any,
  SessionStroage extends any,
  LocalKey extends string,
  SessionKey extends string
>(
  init: {
    local: Record<LocalKey, LocalStroage>;
    session: Record<SessionKey, SessionStroage>;
  },
  option: { defaultUseInit: boolean } = {
    defaultUseInit: false,
  }
) => {
  let INIT_LOCAL_STORAGE = init.local;
  let INIT_SESSION_STORAGE = init.session;
  const getStorageItemFunction = <
    Stroage extends any,
    Method extends "get" | "set" | "remove" | "clear",
    Key extends string
  >(
    object: Storage,
    action: Method,
    INIT_STORAGE: Record<Key, Stroage>
  ) => {
    type LocalStoroages = keyof typeof INIT_STORAGE;
    const funcMap = {
      get: <T extends LocalStoroages, GetExtends extends boolean>(
        item: T,
        ifNullIsGetInit?: GetExtends
      ): GetExtends extends true
        ? (typeof INIT_STORAGE)[T]
        : (typeof INIT_STORAGE)[T] | null => {
        const isGetInit =
          ifNullIsGetInit === undefined
            ? option.defaultUseInit
            : ifNullIsGetInit;
        let local: (typeof INIT_STORAGE)[T] = null;
        if (typeof window !== "undefined") {
          const item_string = object.getItem(item);
          if (item_string) {
            try {
              local = JSON.parse(item_string);
            } catch (err) {
              console.log(err);
            }
          } else if (isGetInit) {
            local = INIT_STORAGE[item];
          }
        }
        return local;
      },
      set: <T extends LocalStoroages>(
        key: T,
        value: (typeof INIT_STORAGE)[T]
      ): void => {
        if (typeof window !== "undefined") {
          object.setItem(key, JSON.stringify(value));
        }
      },
      remove: <T extends LocalStoroages>(item: T): void => {
        if (typeof window !== "undefined") {
          object.removeItem(item);
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
