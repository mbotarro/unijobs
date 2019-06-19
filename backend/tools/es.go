package tools

import (
	"encoding/json"
	"fmt"

	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/olivere/elastic/v7"
)

// GetRequestFromSearchResult unmarshalls all Requests from an ES Search Hits
func GetRequestFromSearchResult(searchResult *elastic.SearchResult) ([]models.RequestES, error) {
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

// GetOfferFromSearchResult unmarshalls all Offers from an ES Search Hits
func GetOfferFromSearchResult(searchResult *elastic.SearchResult) ([]models.OfferES, error) {
	offs := make([]models.OfferES, 0, int(searchResult.TotalHits()))
	for _, hit := range searchResult.Hits.Hits {
		// Deserialize hit.Source into a Request
		var gotOff models.OfferES
		err := json.Unmarshal(hit.Source, &gotOff)
		if err != nil {
			return nil, fmt.Errorf("%s:%s", errors.ESUnmarshallError, err.Error())
		}
		offs = append(offs, gotOff)
	}

	return offs, nil
}
