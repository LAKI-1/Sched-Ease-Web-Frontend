const url: string = "http://localhost:8080";

export async function getRequest<T>(token: string, target: string, params: Record<string, string>,): Promise<T> {


    const reqHeaders = new Headers();

    reqHeaders.append("Authorization", `${token}`);

    const requestOptions: RequestInit = {
        method: "GET",
        headers: reqHeaders,
        redirect: "follow"
    };

    let fetchStr = `${url}/${target}?`;

    fetchStr += new URLSearchParams(params).toString();

    console.log(fetchStr);
    console.log(requestOptions);

    try {
        const response = await fetch(fetchStr, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result: T = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function postRequest(token: string, target: string, headers: Record<string, string>): Promise<Response> {
    // const url: string = import.meta.env.VITE_SE_BE_URL as string;

    const reqHeaders = new Headers();

    reqHeaders.append("Authorization", `${token}`);

    Object.keys(headers).forEach(header => {
        reqHeaders.append(header, headers[header]);
    });

    const requestOptions: RequestInit = {
        method: "POST",
        headers: reqHeaders,
        redirect: "follow"
    };

    let fetchStr = `${url}/${target}`;

    // console.log(fetchStr);
    // console.log(requestOptions);

    try {
        const response = await fetch(fetchStr, requestOptions);
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // const result = await response.json();
        // return result;
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
