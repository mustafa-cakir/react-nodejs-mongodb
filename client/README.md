This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

---

Live Demo: https://mustafa-cakir-bux-zero.firebaseapp.com

---

### State Management

-   `redux` has been used to manage the global-level or screen-level states
-   `useState` has been used in various components to keep the state closer to where is actually being used

---

### Folder Structure

-   `src/app` Global app setup and configurations used by the entire app are defined in the app folder (slices - reducer and actions -, store, routes, types and app container)
-   `src/features` Feature-specific components, Slice (Redux reducer logic and associated actions — [Redux Toolkit](#https://redux-toolkit.js.org/)), APIs, and styles are placed in the features' folder.
-   `src/common` Re-usable helpers/utils, shared components, hooks, etc. are defined in the common folder
-   `src/assets` Static assets like images, files, icons are placed in the assets' directory (global stylesheet, mixins, colors and custom UI-kit)
-   `src/screens` Includes the screen container of the page/routes

fyi: The `feature folder structure` is recommended by the [Redux style guide](#https://redux.js.org/style-guide/style-guide#structure-files-as-feature-folders-with-single-file-logic). By using Redux Toolkit, it is now possible to avoid boilerplate code like actions and reducers.

---

### How It Works:

-   In the initial visits, user has no previously saved stocks (`favStocks`) hance the favorite stock table is empty and empty state is rendered
-   Once user start typin in the search box, after the 2 letters, search is being made to figure out if the entered stock is actually available in the stock-list
-   If there is a result, the found stock is displayed within the search dropdown;
    -   If the stock has already been in the fav-list, then the plus icon is displayed as checked-icon. Clicking the stock closes the dropdown.
    -   If the stock is not in the fav-list, then plus icon is displayed. Clicking the stock adds the stock to fav-list and closes the dropdown.
-   User's favorite stocks list is stored in the redux as follows;
    -   under `user` object => `redux.user.favStocks` as `string[]`, i.e: ['APL', 'BTC']`
    -   under `favoriteStocks` object => `redux.favoriteStocks.quotes` as `IQuote[]`
-   Search result state is stored in the redux as `redux.search.quote`, as `IQuote`
-   Fav-lists are also stored in the localStorage to keep the persistency, the value from localStorage gets setted to `redux.user.favStocks` as the default state; and each stock is fecthed to display the intiial favList using `fetchQuotesOnInit()`
    -   Upon second visits - or on page refresh - localStorage will help us retrieves the previously stored fav-list (ideally this approach should be carried to API and list should have been saved to user's profile)
-   If user clicks the remove icon from the fav-list table the clicked stock gets deleted from `redux.favoriteStocks.quoes` and `redux.user.favStocks` (localStorage also gets updated)
-   Once user clicks the theme switcher icon from the top-right corner, theme of the website is changed (light or dark). App container gets `theme-dark` or `theme-light` classname accordingly hence all components has different style for different theme. This configuration is stored in the `redux.user.theme` and as wel as in the localStorage under user object to keep the persistency
-   Once user clicks the grid/list switcher icon, favorite stocks are either displayed in a table or in grid-view. This configuration is stored in the `redux.user.listingType` and as wel as in the localStorage under user object to keep the persistency. The available options are `table` | `grid`
-   If user clicks the detail button from the favorite stocks list, the company detail modal is displayed. This component fetch the company data from `/stock/{symbol}/company` endpoint.
-   Github actions are defined, and firebase configurations are completed. CI/CD is fully applied to poject. Once a commit is pushed to `main` branch, app automatically get build and deployed to firebase (URL: https://mustafa-cakir-bux-zero.firebaseapp.com)

---

### Tests

-   npm package `msw` has been used to mock the API requests
-   React Testing Library has been used to run the unit and integration tests

---

### Test Summary

    Test Suites: 32 passed, 32 total
    Tests:       96 passed, 96 total
    Snapshots:   0 total
    Time:        2.924 s, estimated 3 s

---

### Test Cases

`[PASS] - src/app/App.spec.tsx`

-   App
    -   ✓ should render app without any error (73 ms)

`[PASS] - src/features/FavoriteStocks/FavoriteStocksAPI.spec.ts`

-   Favorite Stocks Api
    -   ✓ should fetch quote (26 ms)
    -   ✓ should fetch multiple quotes on initial load (7 ms)

`[PASS] - src/features/FavoriteStocks/FavoriteStocksSlice.spec.ts`

-   FavoriteStocks reducer
    -   ✓ should handle initial state (3 ms)
    -   ✓ should handle add item to quotes (2 ms)
    -   ✓ should handle remove item from quotes

`[PASS] - src/features/FavoriteStocks/Search/Search.spec.tsx`

-   Favorite Stocks Search Component
    -   ✓ should render search component without any error (36 ms)
    -   ✓ should search input have empty value by default (7 ms)
    -   ✓ should display the type value in the input (10 ms)
    -   ✓ should trigger search after typing more than 2 letters and open dropdown (6 ms)

`[PASS] - src/features/FavoriteStocks/Search/Dropdown/Dropdown.spec.tsx`

-   Dropdown Component
    -   ✓ should render dropdown component without any error (37 ms)
    -   ✓ should make the search based on the keyword provided and display the results (87 ms)
    -   ✓ should display error if nothing is found (28 ms)
    -   ✓ should clicking the button triggeres addStockToFavCallback callbackk (35 ms)
    -   ✓ should clicking the button add company to state (42 ms)

`[PASS] - src/features/FavoriteStocks/Search/SearchAPI.spec.tsx`

-   Fetch Search Api
    -   ✓ should fetch search as expected (23 ms)
    -   ✓ should fetch search handle error (7 ms)

`[PASS] - src/features/FavoriteStocks/Search/SearchSlice.spec.tsx`

-   Search reducer
    -   ✓ should handle initial state (4 ms)

`[PASS] - src/features/FavoriteStocks/Search/Dropdown/ShimmerLoading/ShimmerLoading.spec.tsx`

-   Dropdown Shimmer Component
    -   ✓ should render shimmer loading component without any error (22 ms)

`[PASS] - src/features/FavoriteStocks/CompanyDetails/CompanyDetails.spec.tsx`

-   Company Details Component
    -   ✓ should display without any error and display all company details (95 ms)
    -   ✓ should display error message if nothing is found (23 ms)
    -   ✓ should display empty state if nothing is found (22 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/ListContainer.spec.tsx`

-   Favorite Stocks List Contianer Component
    -   ✓ should render list container component without any error (25 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/List/List.spec.tsx`

-   Favorite Stocks List Component
    -   ✓ should render stock list component without any error (76 ms)
    -   ✓ should handle empty case (8 ms)
    -   ✓ should handle error (21 ms)
    -   ✓ should handle loading state (9 ms)
    -   ✓ should display stocks in table-layout if it is default users list type (15 ms)
    -   ✓ should display stocks in grid-layout if it is default users list type (13 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/List/ShimmerLoading/ShimmerLoading.spec.tsx`

-   List Shimmer Component
    -   ✓ should render shimmer loading component without any error (23 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/List/EmptyState/EmptyState.spec.tsx`

-   Empty State Contianer Component
    -   ✓ should render empty state component without any error (20 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/List/TableLayout/TableLayout.spec.jsx`

-   Table Layout Component
    -   ✓ should render stocks in table without any error (61 ms)
    -   ✓ should display all available stocks (14 ms)
    -   ✓ should clicking remove button remove the stock (15 ms)
    -   ✓ should clicking detail button open company details modal (14 ms)
    -   ✓ should display company symbol, price, change properly in each row (18 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/ListHeader/ListHeader.spec.tsx`

-   Favorite Stocks List Header Component
    -   ✓ should render header component without any error (25 ms)
    -   ✓ should render the title (13 ms)
    -   ✓ should render the listing type toggle buttons (8 ms)
    -   ✓ should table list type button is activated by default (7 ms)
    -   ✓ should clicking the inactive button switch the global listing type (13 ms)

`[PASS] - src/features/FavoriteStocks/ListContainer/List/GridLayout/GridLayout.spec.tsx`

-   Grid Layout Component
    -   ✓ should render stocks in table without any error (56 ms)
    -   ✓ should display all available stocks (15 ms)
    -   ✓ should clicking remove button remove the stock (15 ms)
    -   ✓ should clicking detail button open company details modal (15 ms)
    -   ✓ should display company symbol, price, change properly in each row (19 ms)

`[PASS] - src/features/Footer/Footer.spec.tsx`

-   Footer Component
    -   ✓ should render footer component without any error (27 ms)

`[PASS] - src/features/Header/Header.spec.tsx`

-   Header Component
    -   ✓ should render header component without any error (58 ms)
    -   ✓ should display slogan in the header (13 ms)
    -   ✓ should display logo in the header (10 ms)
    -   ✓ should render themeSwitcher component (10 ms)
    -   ✓ should render menuItems component (13 ms)

`[PASS] - src/screens/Homepage/Homepage.spec.tsx`

-   Homepage Screen
    -   ✓ should render homepage screen without any error (55 ms)

`[PASS] - src/screens/Page404/Page404.spec.tsx`

-   Page 404 Screen
    -   ✓ should render page 404 screen without any error (30 ms)
    -   ✓ should display the page not found error message (6 ms)

`[PASS] - src/screens/UIKit/UIKit.spec.tsx`

-   UIKit Screen
    -   ✓ should render uikit screen without any error (251 ms)

`[PASS] - src/common/components/Modal/Modal.spec.tsx`

-   Modal Common Component
    -   ✓ should render modal component (43 ms)
    -   ✓ should modal component display content inside the modal (14 ms)
    -   ✓ should modal component refrelect max-width prop (37 ms)
    -   ✓ should modal component reflects title prop (8 ms)
    -   ✓ should trigger closeHandler upon clicking the close button (13 ms)

`[PASS] - src/common/components/ThemeSwitcher/ThemeSwitcher.spec.tsx`

-   ThemeSwitcher Common Component
    -   ✓ should render percentage component (27 ms)
    -   ✓ should not be checked if theme is light (from the redux store) (5 ms)
    -   ✓ should be checked if theme is dark (from the redux store) (6 ms)
    -   ✓ should toggle the theme upon clicking (15 ms)

`[PASS] - src/common/components/Shimmer/ShimmerItem.spec.tsx`

-   Shimmer Common Component
    -   ✓ should render shimmer items component (27 ms)
    -   ✓ should reflect the className prop to shimmer items properly (4 ms)
    -   ✓ should reflect the marginBottom prop to shimmer items properly (31 ms)
    -   ✓ should reflect the height prop to shimmer items properly (10 ms)
    -   ✓ should reflect the width prop to shimmer items properly (6 ms)

`[PASS] - src/common/components/Percentage/Percentage.spec.tsx`

-   Percentage Common Component
    -   ✓ should render percentage component (26 ms)
    -   ✓ should format percentage properly based on the changed percentage (6 ms)
-   Change percentage is negative
    -   ✓ should display text as green (6 ms)
    -   ✓ should display up icon (5 ms)
    -   ✓ should display text as red (5 ms)
    -   ✓ should display down icon (4 ms)

`[PASS] - src/common/components/WithAnimation/WithAnimation.spec.tsx`

-   WithAnimation Common Component
    -   ✓ should render component without any error (26 ms)
    -   ✓ should hide itself if isShow is false (4 ms)
    -   ✓ should display children as its content (12 ms)

`[PASS] - src/common/components/MenuItems/MenuItems.spec.tsx`

-   MenuItems Common Component
    -   ✓ should render menu items component (29 ms)
    -   ✓ should menu items component display items (7 ms)

`[PASS] - src/common/components/Alert/Alert.spec.tsx`

-   Alert Common Component
    -   ✓ should render alert component (26 ms)
    -   ✓ should alert component display message prop (4 ms)
    -   ✓ should alert component type set to error (5 ms)
    -   ✓ should alert component type set to info (5 ms)
    -   ✓ should alert component type set to success (5 ms)
    -   ✓ should alert component type set to warning (4 ms)

`[PASS] - src/common/utils/utils.spec.tsx`

-   Utils (helper methods)
    -   ✓ should return null for getUserStateFromLocalStorage on initial user visit (2 ms)
    -   ✓ should getUserStateFromLocalStorage and setUserStateToLocalStorage work as expected (1 ms)
    -   ✓ should currenyFormatter properly format currencies (16 ms)
    -   ✓ should percentageFormatter properly format percentage (1 ms)

`[PASS] - src/common/FetchIEX/FetchIEX.spec.tsx`

-   FetchIEX Common API Method
    -   ✓ should make fetch request (13 ms)
    -   ✓ should return error properly (6 ms)

`[PASS] - src/common/components/Icons/Icons.spec.tsx`

-   Icons Common Component
    -   ✓ should render icons component (19 ms)
    -   ✓ should icon component display icons (3 ms)

`[PASS] - src/common/components/Shimmer/Shimmer.spec.tsx`

-   Shimmer Common Component
    -   ✓ should render shimmer component (21 ms)

---

### TODO's

-   Instead of using `/stock/{symbol}/quote` for searching, `/stock/search/{keyword}` could have been used.
-   User's favorite stocks are stored in the localStorage for persistency, this approach should be carried to user profile endpoint.
-   On initial load; user's previous favorite stocks are taken from localstorage as `['AAPL', 'GOOGLE']` and each of symbole are re-fetched from `/stock/{symbol}/quote` one by one, as the request(s) are resolved, they are appended to `redux.favoriteStocks.quote` as "first-come-first-serve", hence the order of the fav-list might be different on each page refresh. Ideally, single endpoint shoould be used to fetch-multi stock quotes at a time, the response should be in the given sorting.

---

### Getting Started

1. Make sure you have a fresh version of [Node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) installed.

2. Clone this repository to your computer:

    ```sh
    git clone git@github.com:mustafa-cakir/cra-finance.git
    ```

3. From the project's root directory, install the required packages (dependencies):

    ```sh
    yarn install
    ```

4. To run the app on your local machine (http://localhost:3000):

    ```sh
    # it will start a server instance on port 3000
    yarn start
    ```

5. To run the test watcher in an interactive mode:

    ```sh
    # By default, runs tests related to files changed since the last commit.
    yarn test
    ```

6. To build the app:

    ```sh
    # it will place all files needed for deployment into the /build directory
    yarn build
    ```
