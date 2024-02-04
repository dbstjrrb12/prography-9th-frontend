# Prography 9th Frontend Pre-Test

프로그라피 9기 프론트엔드 챕터 선발을 위한 사전 과제입니다.

## 실행 방법

### 프로젝트 실행 환경

- packageManger : yarn@1.22.19
- node : node@18.17.0
- IDE : Vscode

### 프로젝트 폴더 다운받기

```
$ git clone https://github.com/dbstjrrb12/prography-9th-frontend.git
```

```
$ cd prography-9th-frontend
```

### 노드 버전 확인하기

현재 노드 버전이 18.17.0 이상인지 확인해야 합니다.

```
$ node -v
```

Vscode 환경에서 실행하기를 권장합니다. Vscode에서 프로젝트를 열 경우, 자동으로 nvm use 를 통해 노드 버전이 세팅되도록 설정해두었습니다.

그럼에도 만약 노드 버전이 다른 경우 nvm 을 사용하고 계시다면 프로젝트 루트에서 다음 명령어를 실행하세요.

```
$ yarn nvm
```

혹은

```
$ nvm use v18.17.0
```

### 프로젝트 시작하기

```
$ yarn install  // 패키지 설치하기
```

```
$ yarn build  // 프로젝트 빌드하기
```

```
$ yarn preview // 프로젝트 실행하기
```

브라우저에서 http://localhost:3000 에서 프로젝트가 실행되는지 확인하세요

## 프로젝트 소개

### 기술 환경

- react 18.2.0
- react-dom 18.2.0
- typescript 3.4.1
- tailwindcss 3.4.1
- vite 5.0.8
- @tanstack/reat-query 4.36.1

### 구현 요구 사항

- 프레임워크 및 UI 라이브러리는 사용할 수 없습니다.
- 카테고리 리스트를 API로 받아옵니다
- 카테고리 선택 시, 해당 카테고리의 음식 리스트 API 를 호출하여 보여줍니다. (아무것도 선택하지 않을 경우, 아무것도 보여주지 않습니다)
- 카테고리는 복수 선택이 가능하며, 선택을 해제할 경우 해당 카테고리 음식을 제외시켜야 합니다.
- 최대 20개까지 한번에 보여줄 수 있고, 인피니티 스크롤을 이용해 상품을 추가적으로 보여줍니다.
- 음식 리스트의 정렬은 사용자 선택에 따라, 최신순/이름 오름차순/이름 내림차순으로 정렬할 수 있습니다.
- 상품은 선택에 따라 2개/4개씩 한 행에 보여줄 수 있고, 모바일의 경우는 행당 1개의 상품만 노출합니다.
- 상품의 카테고리 및 정렬의 경우 쿼리 스트링으로 업데이트 하고, 해당 쿼리 정보를 가진 url 로 접근했을 때 해당 값으로 세팅되어야 합니다.
- 이미지를 레이지 로딩 처리해야 합니다.

### 개발 과정에서 고민한 것들

#### 에러 바운더리 설정

- API 호출 과정에서 에러가 발생할 경우, 해당 에러로 인해 어플리케이션 전체에 영향이 가지 않도록 에러 바운더리를 설정했습니다.
- suspense 또는 useErrorBoundaries 옵션을 사용한 쿼리의 경우, 리액트 쿼리가 제공하는 `QueryErrorResetBoundary`를 이용하면 하위 쿼리에서 에러가 발생한 경우 이를 다시 호출 할 수 있는 메소드를 선언적으로 사용할 수 있습니다.
- 다른 곳들에서 재사용이 가능하도록 별도 컴포넌트로 분리하였습니다.

#### 서버에서 받아온 데이터를 좀 더 쉽게 가공하기

- 서버에서 정의된 스펙과 실제 클라이언트에서 사용하기 적합한 데이터 형태가 다르기 때문에 이를 보통 컴포넌트 내부에서 이를 다시 사용하기 쉽도록 가공하는 편입니다.
- 예를 들어 음식 리스트의 경우, 하나의 API에 한 개의 카테고리를 요청해야 하기 때문에 복수의 카테고리를 선택한 경우 해당 API 호출 후 받은 응답들을 하나의 배열로 합쳐야 했습니다.
- 다만 데이터를 응답받은 컴포넌트 내부에서 가공을 하는 경우 불필요한 로직이 혼재되어 코드양이 길어지고 복잡해질 수 있다고 생각이 들어 리액트 쿼리에서 제공하는 select 옵션을 사용했습니다.
- select 옵션은 응답받은 데이터를 원하는 형태로 가공할 수 있는 옵션입니다. 따라서 데이터를 사용하는 쪽에서는 데이터 가공에 대한 고민 없이 개발할 수 있고, 코드도 보다 깔끔해졌습니다.

#### 전역 상태 라이브러리 없이, 컴포넌트간 상태를 공유할 수 없을까?

- 컴포넌트를 설계하며, 서로 다른 관심사에 따라 컴포넌트를 분리하여 분리된 컴포넌트간 상태 공유를 위해 전역 상태 라이브러리가 필요하였습니다.
- 하지만 개발 요구 사항에 명시되었듯이 사용자의 선택에 따라 URL 쿼리가 업데이트 되는 것을 감지할 수 있는 이벤트만 있다면 전역 상태 라이브러리 없이도 컴포넌트 간 상태 공유가 가능하다고 생각했습니다.
- 다만 쿼리 업데이트를 위해 replaceState 메소드의 호출을 감지할 수 있는 Window 이벤트가 없다는 문제가 발생했습니다. 이를 해결하기 위해 window.history.replaceState 함수를 Proxy 로 wrapping 한 뒤, 함수 호출부에 CustomEvent 를 dispatch 하도록 설정했습니다
- 그리고 URL 에 따라 상태가 업데이트 되어야 하는 컴포넌트에서 'replaceState' 이벤트를 등록하도록 했습니다.
- 이를 좀 더 응집하기 위해, useHistory 라는 훅을 생성하였고, 해당 훅에서 wrapping 된 replaceState 함수와 이벤트 핸들러를 등록시켜 훅을 사용하는 컴포넌트 내부에서 변경된 쿼리에 따라 리액트 상태가 변경될 수 있도록 했습니다.
- 물론 전역 상태 라이브러리를 이용하면 간단한 문제이지만, 기존에 무분별한 전역 상태 사용으로 코드의 유지보수 및 가독성이 안좋았던 경험이 있어서 최대한 데이터의 사용과 업데이트가 명확하게 확인될 수 있는 방법을 고민할 수 있었습니다. 물론 새롭게 알게된 Proxy 객체도 사용해 볼 수 있어서 개인적으로 유익한 시간이었습니다.

```js
const useHistory = () => {
  const [url, setUrl] = useState(new URL(window.location.href));
  ...
  const query = qs.parse(url.search.replace('?', ''));

  const replace = (url: string) => {
    // 새로운 Proxy 객체로 기존 replaceState 메소드를 교체하고
    window.history.replaceState = new Proxy(window.history.replaceState, {
      apply: (target, thisArg, [data, unused, url]) => {
        window.dispatchEvent(
          new CustomEvent('replaceState', {
            detail: { url, origin },
          })
        );
        return target.apply(thisArg, [data, unused, url]);
      },
    });

    // 교체한 메소드를 실행합니다.
    window.history.replaceState(null, '', url);
  };
  ...
   const events = {
    on: ( eventName, callback) => {
      window.addEventListener(eventName, callback);
    },
    ...
  };


  return {
    query,
    replace,
    ...
  }
}

```
