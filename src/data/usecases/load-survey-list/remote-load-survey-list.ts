import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";

export class RemoteLoadSurveyList {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient) { }

    async loadAll(): Promise<void> {
        const httpReponse = await this.httpGetClient.get({ url: this.url })
        switch (httpReponse.statusCode) {
            case HttpStatusCode.ok: break //return httpReponse.body
            // case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
        }
    }
}
