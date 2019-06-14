package dal_test

import (
	"testing"
	"time"
	"context"

	"github.com/jmoiron/sqlx"
	"github.com/mbotarro/unijobs/backend/dal"
	"github.com/mbotarro/unijobs/backend/models"
	"github.com/mbotarro/unijobs/backend/tools"
	"gotest.tools/assert"
	"github.com/olivere/elastic/v7"
)

func getRequestDAL(db *sqlx.DB, es *elastic.Client) *dal.RequestDAL {
	return dal.NewRequestDAL(db, es)
}

func TestGetLastRequests(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now()),
	}

	requestDAL := getRequestDAL(db, es)

	t.Run("without size limit", func(t *testing.T) {
		gotReqs, err := requestDAL.GetLastRequests(time.Now(), 30)
		assert.Equal(t, nil, err)

		assert.Equal(t, 3, len(gotReqs))
		assert.Equal(t, reqs[2], gotReqs[0])
		assert.Equal(t, reqs[1], gotReqs[1])
		assert.Equal(t, reqs[0], gotReqs[2])
	})

	t.Run("with size limit", func(t *testing.T) {
		t.Run("size 2", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now(), 2)
			assert.Equal(t, nil, err)

			assert.Equal(t, 2, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
			assert.Equal(t, reqs[1], gotReqs[1])
		})

		t.Run("size 1", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now(), 1)
			assert.Equal(t, nil, err)

			assert.Equal(t, 1, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
		})
	})

}

func TestGetLastRequestsBeforeTimestamp(t *testing.T) {
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	reqs := []models.Request{
		tools.CreateFakeRequest(t, db, "Aula Cálculo I", "", u.Userid, c.ID, time.Now().Add(-25*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo II", "", u.Userid, c.ID, time.Now().Add(-24*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Álgebra Linear", "", u.Userid, c.ID, time.Now().Add(-23*time.Hour)),
		tools.CreateFakeRequest(t, db, "Aula Cálculo III", "", u.Userid, c.ID, time.Now()),
		tools.CreateFakeRequest(t, db, "Aula Cálculo IV", "", u.Userid, c.ID, time.Now()),
	}

	requestDAL := getRequestDAL(db, es)

	t.Run("without size limit", func(t *testing.T) {
		// Get only the requests created before 1 hour ago
		gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 30)
		assert.Equal(t, nil, err)

		// We should get just the first two requests, ordered by creation time
		assert.Equal(t, 3, len(gotReqs))
		assert.Equal(t, reqs[2], gotReqs[0])
		assert.Equal(t, reqs[1], gotReqs[1])
		assert.Equal(t, reqs[0], gotReqs[2])
	})

	t.Run("with size limit", func(t *testing.T) {
		t.Run("size 2", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 2)
			assert.Equal(t, nil, err)

			assert.Equal(t, 2, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
			assert.Equal(t, reqs[1], gotReqs[1])
		})

		t.Run("size 1", func(t *testing.T) {
			gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 1)
			assert.Equal(t, nil, err)

			assert.Equal(t, 1, len(gotReqs))
			assert.Equal(t, reqs[2], gotReqs[0])
		})
	})
}

func CompareRequests(req1, req2 models.Request) bool {
	equalReqs := true

	equalReqs = equalReqs && (req1.Name == req2.Name)
	equalReqs = equalReqs && (req1.Description == req2.Description)
	equalReqs = equalReqs && (req1.ExtraInfo == req2.ExtraInfo)
	equalReqs = equalReqs && (req1.MaxPrice == req2.MaxPrice)
	equalReqs = equalReqs && (req1.MinPrice == req2.MinPrice)
	equalReqs = equalReqs && (req1.Userid == req2.Userid)
	equalReqs = equalReqs && (req1.Categoryid == req2.Categoryid)

	return equalReqs
}

func TestInsertRequest(t *testing.T) {
	// Get connection to test database and cleans it
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	requestDAL := getRequestDAL(db, es)

	// Create the fake request
	var req models.Request
	req.Name = "Requis Aula Calc"
	req.Description = "Procuro aula de calculo"
	req.ExtraInfo = "Informacao X"
	req.MinPrice = 20
	req.MaxPrice = 50

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	req.Userid = u.Userid
	req.Categoryid = c.ID

	// Executes the test query
	err := requestDAL.InsertRequest(req)

	// Checks the expected results
	assert.Equal(t, nil, err)

	// Checks if the request was inserted successfully
	t.Run("size 1", func(t *testing.T) {
		gotReqs, err := requestDAL.GetLastRequests(time.Now().Add(-time.Hour), 1)
		assert.Equal(t, nil, err)

		equalReqs := CompareRequests(gotReqs[0], req)
		assert.Equal(t, equalReqs, true)
	})
}

func TestInserRequestInES(t *testing.T){
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	requestDAL := getRequestDAL(db, es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	// Create fake request in db and insert the same request in ES
	req := tools.CreateFakeRequest(t, db, "Aula de Cálculo I", "Procuro Aula de Cálculo I", u.Userid, c.ID, time.Now())

	// Executes the test query
	err := requestDAL.InsertRequestInES(req)

	// We expect no error in the insertion
	assert.Equal(t, nil, err)

	// Checks if the request was inserted successfully
	
	t.Run("1 insertion", func(t *testing.T) {
		termQuery := elastic.NewTermQuery("db_id",req.ID)
		searchResult, err := es.Search().
			Index("request").
			Query(termQuery).
			Do(context.Background())
		
		// We expect no error
		assert.Equal(t, nil, err)
		assert.Equal(t, 1, int(searchResult.TotalHits()))

		gotReqs, err := tools.GetRequestFromSearchResult(searchResult)
		assert.Equal(t, nil, err)
		assert.Equal(t, 1, len(gotReqs))
	})

	req2 := tools.CreateFakeRequest(t, db, "Algeling", "Help me, please", u.Userid, c.ID, time.Now())
	err = requestDAL.InsertRequestInES(req2)
	assert.Equal(t, nil, err)

	t.Run("2 insertions", func(t *testing.T){
		termsQuery := elastic.NewTermsQuery("db_id", req.ID, req2.ID)
		searchResult, err := es.Search().
			Index("request").
			Query(termsQuery).
			Do(context.Background())
		// We expect no error
		assert.Equal(t, nil, err)
		assert.Equal(t, 2, int(searchResult.TotalHits()))

		gotReqs, err := tools.GetRequestFromSearchResult(searchResult)
		assert.Equal(t, nil, err)
		assert.Equal(t, 2, len(gotReqs))
	})
}

func TestSearchRequestInES(t *testing.T){
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	requestDAL := getRequestDAL(db, es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")

	req := tools.CreateFakeRequest(t, db, "Aula de Cálculo I", "Procuro Aula de Cálculo I", u.Userid, c.ID, time.Now())
	err := requestDAL.InsertRequestInES(req)
	assert.Equal(t, nil, err)
	
	t.Run("one element in es", func(t *testing.T){
		t.Run("match exact name", func(t *testing.T){
			ids, err := requestDAL.SearchInES(req.Name, req.Description)
			
			// We expect to recover just the ID of the only request inserted
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	
		t.Run("match name without accent", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Aula de Calculo I", req.Description)
			
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})

		t.Run("match name with typo", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Aula de Clculo I", req.Description)
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	
		t.Run("match part of the name", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Calculo I", req.Description)
			
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	})

	req2 := tools.CreateFakeRequest(t, db, "Aula de Cálculo II", "Procuro Aula de Cálculo II", u.Userid, c.ID, time.Now())
	req3 := tools.CreateFakeRequest(t, db, "Aula de Cálculo III", "Procuro Aula de Cálculo III", u.Userid, c.ID, time.Now())

	t.Run("3 elements in es", func(t *testing.T){		
		for _, req := range []models.Request{req, req2, req3}{
			err := requestDAL.InsertRequestInES(req)
			assert.Equal(t, nil, err)
		}
		
		t.Run("match exact name", func(t *testing.T){
			ids, err := requestDAL.SearchInES(req.Name, req.Description)
			
			// We expect to recover the IDs of the 3 request but with the first one in the top
			assert.Equal(t, nil, err)
			assert.Equal(t, 3, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	})
	

}
