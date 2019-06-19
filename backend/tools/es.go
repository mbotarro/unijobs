package tools

import(
	"fmt"
	"encoding/json"

	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/olivere/elastic/v7"
)
// GetRequestFromSearchResult Unmarshall all Request from an ES Search Hits
func GetRequestFromSearchResult(searchResult *elastic.SearchResult) ([]models.RequestES, error){
	reqs := make([]models.RequestES, 0, int(searchResult.TotalHits()))
	for _, hit := range searchResult.Hits.Hits {
		// Deserialize hit.Source into a Request
		var gotReq models.RequestES
		err := json.Unmarshal(hit.Source, &gotReq)
		if err != nil {
			return nil, fmt.Errorf("%s:%s", errors.ESUnmarshallError, err.Error())
		}
		reqs = append(reqs, gotReq)
	}

	return reqs, nil
}