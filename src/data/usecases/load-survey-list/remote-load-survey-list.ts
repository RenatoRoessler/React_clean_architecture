import { HttpGetClient, HttpStatusCode } from "@/data/protocols/http";
import { UnexpectedError } from "@/domain/errors";
import { SurveyModel } from "@/domain/models";
import { LoadSurveyList } from "@/domain/usecases";

export class RemoteLoadSurveyList implements LoadSurveyList {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient<SurveyModel[]>) { }

    async loadAll(): Promise<SurveyModel[]> {
        const httpReponse = await this.httpGetClient.get({ url: this.url })
        switch (httpReponse.statusCode) {
            case HttpStatusCode.ok: return httpReponse.body
            case HttpStatusCode.noContent: return []
            // case HttpStatusCode.forbidden: throw new EmailInUseError()
            default: throw new UnexpectedError()
        }
    }
}