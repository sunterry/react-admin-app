
const initState = {
  collapsed: false,
};

const COLLAPSED = 'COLLAPSED';

export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case COLLAPSED:
      return { ...state, ...payload };
    default:
      return state;
  }
};


export const setCollapsed = (data) => {
  return { type: COLLAPSED, payload: { collapsed: data }}
};
