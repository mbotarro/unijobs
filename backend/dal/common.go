package dal

import (
	"context"
	"fmt"

	"github.com/mbotarro/unijobs/backend/errors"
	"github.com/olivere/elastic/v7"
)

// searchDocumentInES is used to search for requests or offers in ES.
// It matches the query against a request/offer name and description and filters the results according to the informed categoryIDs
func searchDocumentInES(es *elastic.Client, index string, query string, categoryIDs ...int) (*elastic.SearchResult, error) {
	q := elastic.NewMultiMatchQuery(query).
		Type("most_fields").         // The final score is the sum of the matched fields with their respective weight
		FieldWithBoost("name", 2.5). // The match in the name should has a higher score than a match in the description
		FieldWithBoost("description", 1)

	b := elastic.NewBoolQuery() // A Bool query is needed to filter the results
	b.Must(q)

	// If any categoryID is passed by the variadic parameter
	if len(categoryIDs) != 0 {
		// categoryIDs is an int slice. To use NewTermsQuery, we need an interface{} slice. We need to convert them!
		ids := make([]interface{}, 0, len(categoryIDs))
		for _, id := range categoryIDs {
			ids = append(ids, id)
		}

		// Passes ids to a variadic function
		b.Filter(elastic.NewTermsQuery("category", ids...))
	}

	searchResult, err := es.Search().
		Index(index).
		Query(b).
		Size(30).                 // TODO: enable pagination
		Sort("_score", false).    // Documents with higher score come first
		Sort("timestamp", false). // Sort in descending order by timestamp for documents with same score
		Do(context.Background())
	if err != nil {
		return nil, fmt.Errorf("%s:%s", errors.ESSearchError, err.Error())
	}

	return searchResult, nil
}
