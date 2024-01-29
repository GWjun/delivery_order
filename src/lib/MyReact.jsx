import React from "react";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const isInitialized = [];
  const deps = [];
  const cleanups = [];
  let cursor = 0;

  function useState(initialValue = "") {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cursor]) {
      memorizedStates[cursor] = initialValue;
      isInitialized[cursor] = true;
    }

    const state = memorizedStates[cursor];

    const setStateAt = (_cursor) => (nextState) => {
      if (state === nextState) return;
      memorizedStates[_cursor] = nextState;
      forceUpdate();
    };
    const setState = setStateAt(cursor);
    cursor = cursor + 1;

    return [state, setState];
  }

  function useEffect(effect, nextDeps) {
    function runDeferedEffect() {
      function runEffect() {
        const cleanup = effect();
        if (cleanup) cleanups[cursor] = cleanup;
      }
      const ENOUGH_TIME_TO_RENDER = 1;
      setTimeout(runEffect, ENOUGH_TIME_TO_RENDER);
    }

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor = cursor + 1;
      runDeferedEffect();
      return;
    }

    const prevDeps = deps[cursor];
    const depsSame = prevDeps.every(
      (prevDep, index) => prevDep === nextDeps[index]
    );
    if (depsSame) {
      cursor = cursor + 1;
      return;
    }

    deps[cursor] = nextDeps;
    cursor = cursor + 1;
    runDeferedEffect();
    console.log(deps);
  }

  function useForceUpdate() {
    const [value, setValue] = React.useState(1);
    const forceUpdate = () => {
      setValue(value + 1);
      cursor = 0;
    };
    return { forceUpdate };
  }

  function resetCursor() {
    cursor = 0;
  }

  // function cleanupEffects() {
  //   cleanups.forEach((cleanup) => typeof cleanup === "function" && cleanup());
  // }

  const useParams = () => {
    return React.useMemo(() => {
      const params = new URLSearchParams(window.location.search);
      const paramObject = {};
      for (const [key, value] of params) {
        paramObject[key] = value;
      }
      return paramObject;
    }, [window.location.search]);
  };

  return { useParams };
})();

export default MyReact;
