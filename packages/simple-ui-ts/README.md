# Let's go

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). But we have added a lot of customization.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:4102](http://localhost:4102) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn storybook`

Runs the component stories in the development mode.\
Open [http://localhost:5102](http://localhost:5102) to view it in the browser.

### `yarn lint:style`

Runs `stylelint` to format your less files.

### `yarn prettier`

Runs `prettier` to format your typescript files.

### `yarn pretty-quick`

Runs `pretty-quick` to format your staged typescript files in git.

### `yarn format`

Formats all your source code.
TODO we need to add this command into git hook.

### `yarn test`

Launches the test runner in the interactive watch mode. All tests are written using Jest.
View [https://jestjs.io/](https://jestjs.io/) for more information.

### `yarn build`

Builds the app for production to the `build` folder.

### `yarn build-storybook`

Builds the component stories for production to the `build` folder.

## Coding Guidelines

### 1. Format Source Code

Before you commit any source code, please run `yarn format` at first.

### 2. Route Definition

If you want to add a new route, please add defintion in `./src/config/routes-info.ts` file.
```
{
  title: 'Queue',
  key: 'queue',
  path: '/queue',
  menu: true,
  children: [
    {
      title: 'Download',
      key: 'download',
      path: '/queue/download',
      menu: true,
    },
  ],
}
```
Then use those routes through `key`.\
**Caution**: Do not use route path directly in any views. Please use method `getRouteInfo`.

```
import { getRouteInfo } from './config/routes-info';

const queuPath = getRouteInfo('queue')!.path;
const downloadPath = getRouteInfo(['queue', 'download'])!.path;
```

### 3. Global Hook

If you want to add a globally used hook, please add them in `./src/hooks` directory.

### 4. Global Context

If you want to add a globally used React context, please add them in `./src/contexts` directory.

### 5. Global State

If you want to add a  globally used Redux state, please add them in `./src/store/slices`. Please refer `./src/store/slices/global-setting-slice.ts`.\

The new Redux store should be exported in `./src/store/slices/index.ts`, then import new reducer in `./src/store/reducer.ts`;

### 6. Image

All images should be added in `./src/assets/images` directory.

### 7. Less Style

Do not import your less file in you React component file, because we need to switch theme dynamically.

**Component** related less file should be imported in `./src/components/style/index.less`.

**Layout** related less file should be imported in `./src/layouts/style/index.less`.

**View** related less file should be imported in `./src/views/style/index.less`.

We create our own style files based on Antd less variable. If you need to override some of them, please add new less variables in `./src/assets/stylesheets/custom-var.less`.

If you need to add a new theme, please refer `dark.less` or `default.less`.

New globally used less helpers and mixins can be added in `./src/assets/stylesheets/helpers` and `./src/assets/stylesheets/mixins`.

#### 7.1 Commonly Used Less Variable
Because we support dark mode, we perfer to reuse less variables from Antd. Please search appropriate less variables. Only imports new less variable when you have to.

We list commonly used less variable as following.
```
// color derived from primary color
@primary-color
@primary-color-hover
@primary-color-active
@primary-color-outline
@primary-1
@primary-2
@primary-3
@primary-4
@primary-5
@primary-6
@primary-7
@primary-8
@primary-9
@primary-10

// font size
@font-size-base // default size
@font-size-lg // large size
@font-size-sm // small size

// default text color and secondary text color
@text-color
@text-color-secondary

// Border color
@border-color-base // base border outline a component
@border-color-split // split border inside a component
@border-width-base // width of the border for a component
@border-style-base // style of a components border

// The background colors for active and hover states for things like
// list items or table cells.
@item-active-bg
@item-hover-bg
@select-item-selected-font-weight // font weight for selected item

@background-color-light // background of header and selected item
@background-color-base // Default grey background color

// Base background color for most components
@component-background

// Shadow
@shadow-color
@shadow-1-up
@shadow-1-down
@shadow-1-left
@shadow-1-right

// Animation
@animation-duration-slow
@animation-duration-base
@animation-duration-fast
@ease-in-out // timing function
```

### 8. Component Story

If you want to add a new React component story, please add them in your component directoy. You can refer `./src/components/ResponsiveContainer/ResponsiveContainer.stories.tsx`.


### 9. Reusable Component

All reusable components should be placed in `./src/components`. The component shouldn't have any business logic, like requesting specific api and this api address can't changed through props.


A general component directory structure. Unused directories can be omitted.\
`style/index.less` should be imported in `./src/components/style/index.less`.
```
ResponsiveContainer
  contexts
    index.ts
    BreakpointContext.ts
  hooks
    index.ts
    useBreakpoint.ts
  style
    index.less
  index.tsx
  ResponstiveContainer.stories.tsx
  ResponsiveContainer.tsx
  
```

### 10. Business View

All business related views should be placed in `./src/views`. You can do any business related operations in view.\

Please use `./src/components/Panel` to wrap you view component.

A general component directory structure. Unused directories can be omitted.\
`style/index.less` should be imported in `./src/views/style/index.less`.
```
Auth
  contexts
    index.ts
    xxxx.ts
  hooks
    index.ts
    useLogin.ts
    useLogout.ts
    useUserInfo.ts
  slices
    index.ts
    user-info-slice.ts
  style
    index.less
  index.tsx
  Login.stories.tsx
  Login.tsx
  
```

### 11. Util Function

Util function should be placed in `./src/util` directory.

### 12. Layout

All layouts should be placed in `./src/layouts/`. You add your layout component and style at here. 

Please refer `AuthLayout.tsx` or `MainLayout`.
New style files should be placed in `./src/layouts/style`.

### 13. API Endpoint

All used apis should be defined in `./src/config/api-endpoints.ts`.
Then use this api in your view.
```
import { getRouteInfo } from '../../../config/routes-info';

const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.login, showError: true, method: 'post' });
```

### 14. Ajax Request

We have two approaches to send ajax request. We prefer use `axios-hooks`.

1. axios\
If you use axios directly, please use hook `./src/hooks/useMounted.ts` to check whether React component destroyed after receiving response.
```
import axios from 'axios';
...

const useLogout = () => {
const [loading, setLoading] = useState(false);
const isMounted = useMounted();
const navigate = useNavigate();
const dipatch = useAppDispatch();

const handleLogout = useCallback(() => {
  setLoading(true);
  axios
    .get(apiEndpoints.auth.logout)
    .then(() => {
      if (isMounted.current) {
        setLoading(false);
        dipatch(clearUserInfo());
        navigate(getRouteInfo('login')!.path);
      }
    })
    .catch(() => {
      if (isMounted.current) {
        setLoading(false);
      }
    });
}, [navigate, isMounted, dipatch]);
```

2. axios-hooks\
In this approach, our request is cancelled after Reactcomponent destroyed. It's much simple.
We prefer this way for general page.
```
import useAxios from 'axios-hooks';
....

const navigate = useNavigate();
const dipatch = useAppDispatch();
const [{ loading }, request] = useAxios({ url: apiEndpoints.auth.logout });

const handleLogout = useCallback(() => {
  request().then(() => {
    dipatch(clearUserInfo());
    navigate(getRouteInfo('login')!.path);
  });
}, [navigate, dipatch, request]);

```

3. RTK Query
In a complicated page with multiple state slices, I recommend you to use '@reduxjs/toolkit/query/react'. Please refer to demo service in `./src/views/Contract/services`.

### 16. Chart Library
1. D3
We imported d3js to develop highly customized chart component, like `./src/components/ModelTree`.

2. Echarts
For general purpose chart, we can simply use Echarts to finish task. One thing you need to pay attention is we partially import Echarts under `./src/config/initializers/echarts`. \
Please import new components at here and use **import * as echarts from 'echarts/core'**" to replace **import * as echarts from 'echarts'**" in your component.\
In general usage, I suggest you to use the custom component `./src/components/CustomECharts/`.

### 17. Initialization

If you have some special logic needed to execute before React rendering, please add them in `./src/config/initializers`. You can refer `dayjs.ts` or `axios.ts`.

### 18. Permission Checking

TODO

### 19. Environment Variable

Backend api port in development mode.\
**REACT_APP_DEV_API_PORT=4200**

Backend api protocol in development mode.\
**REACT_APP_DEV_API_SCHEME=http://**

Backend api address in production mode.\
**REACT_APP_PROD_API_URL=xxxx**