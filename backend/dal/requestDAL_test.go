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

func TestInsertRequestInES(t *testing.T){
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

	req := tools.CreateFakeRequest(t, db, "Aula de Cálculo I", "Preciso de ajuda na matéria", u.Userid, c.ID, time.Now().Add(-10*time.Hour))
	err := requestDAL.InsertRequestInES(req)
	assert.Equal(t, nil, err)
	
	t.Run("one element in es", func(t *testing.T){
		t.Run("match exact name", func(t *testing.T){
			ids, err := requestDAL.SearchInES(req.Name)
			
			// We expect to recover just the ID of the only request inserted
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	
		t.Run("match name without accent", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Aula de Calculo I")
			
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})

		t.Run("match name with typo", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Aula de Clculo I")
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	
		t.Run("match part of the name", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Calculo I")
			
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req.ID, ids[0])
		})
	})

	req2 := tools.CreateFakeRequest(t, db, "Aula de Cálculo II", "Tenho prova semana que vem", u.Userid, c.ID, time.Now().Add(-9*time.Hour))
	req3 := tools.CreateFakeRequest(t, db, "Aula de Cálculo III", "Teorema de Green", u.Userid, c.ID, time.Now().Add(-8*time.Hour))
	for _, req := range []models.Request{req, req2, req3}{
		err := requestDAL.InsertRequestInES(req)
		assert.Equal(t, nil, err)
	}

	t.Run("3 elements in ES", func(t *testing.T){			
		t.Run("match exact name", func(t *testing.T){
			ids, err := requestDAL.SearchInES(req.Name)
			
			// We expect to recover the IDs of the 3 request but with the first one in the top
			assert.Equal(t, nil, err)
			assert.Equal(t, 3, len(ids))
			assert.Equal(t, req.ID, ids[0]) // Cálculo I
			assert.Equal(t, req3.ID, ids[1]) // Cálculo III then Cálculo II because III is most recent
			assert.Equal(t, req2.ID, ids[2])
		})

		t.Run("match specific part of name", func(t *testing.T){
			ids, err := requestDAL.SearchInES("III")

			// We expect to get just the request with 'Cálculo III'
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req3.ID, ids[0])
		})
	})

	// We'll test with 10 request in elasticsearch
	c2 := tools.CreateFakeCategory(t, db, "Aula Física", "Física")
	c3 := tools.CreateFakeCategory(t, db, "Aula Computação", "Ciência de Computação")
	c4 := tools.CreateFakeCategory(t, db, "Extracurricular", "Extracurricular")
	c5 := tools.CreateFakeCategory(t, db, "Serviços Gerais", "Serviços Gerais")

	req4 := tools.CreateFakeRequest(t, db, "Álgebra Linear", "Preciso de ajuda para prova", u.Userid, c.ID, time.Now().Add(-7*time.Hour))
	req5 := tools.CreateFakeRequest(t, db, "Aula de ICC I", "Ajuda em trabalho", u.Userid, c3.ID, time.Now().Add(-6*time.Hour))
	req6 := tools.CreateFakeRequest(t, db, "Aula de ICC II", "Ajuda na matéria", u.Userid, c3.ID, time.Now().Add(-5*time.Hour))
	req7 := tools.CreateFakeRequest(t, db, "Física I", "Ajuda em Conservação de Movimento Linear", u.Userid, c2.ID, time.Now().Add(-4*time.Hour))
	req8 := tools.CreateFakeRequest(t, db, "Aula de Piano", "Procuro aula para iniciantes", u.Userid, c4.ID, time.Now().Add(-3*time.Hour))
	req9 := tools.CreateFakeRequest(t, db, "Pet Care", "Procuro alguém para passear com meu cachorro", u.Userid, c5.ID, time.Now().Add(-2*time.Hour))
	req10 := tools.CreateFakeRequest(t, db, "Limpeza", "Procuro alguém para me ajudar a limpar a casa", u.Userid, c5.ID, time.Now().Add(-time.Hour))

	for _, req := range []models.Request{req4, req5, req6, req7, req8, req9, req10}{
		err := requestDAL.InsertRequestInES(req)
		assert.Equal(t, nil, err)
	}
	
	t.Run("10 elements in ES", func(t *testing.T){		
		t.Run("group of related Subjects 1", func(t *testing.T){
			ids, err := requestDAL.SearchInES("Cálculo")
			
			// We expect to recover the IDs of the 3 requests related to Aula de Cálculo, sorted by decreased date
			assert.Equal(t, nil, err)
			assert.Equal(t, 3, len(ids))
			assert.Equal(t, req3.ID, ids[0])
			assert.Equal(t, req2.ID, ids[1])
			assert.Equal(t, req.ID, ids[2])
		})

		t.Run("group of related Subjects 2", func(t *testing.T){
			ids, err := requestDAL.SearchInES("ICC")

			// Expected Order: ICC II, ICC I because the first one is most recent
			assert.Equal(t, nil, err)
			assert.Equal(t, 2, len(ids))
			assert.Equal(t, req6.ID, ids[0])
			assert.Equal(t, req5.ID, ids[1])
		})

		t.Run("group of unrelated Subjects", func(t * testing.T){
			ids, err := requestDAL.SearchInES("I")

			// We expect to get Física I, Aula de ICC I and Cálculo I
			assert.Equal(t, nil, err)
			assert.Equal(t, 3, len(ids))
			assert.Equal(t, req7.ID, ids[0])
			assert.Equal(t, req5.ID, ids[1])
			assert.Equal(t, req.ID, ids[2])
		})
	})

	t.Run("search in Request description", func(t *testing.T){
		t.Run("value just in description 1", func(t *testing.T){
			ids, err := requestDAL.SearchInES("prova")

			// We expect to get Algebra Linear and Calculo II, in this order
			assert.Equal(t, nil, err)
			assert.Equal(t, 2, len(ids))
			assert.Equal(t, req4.ID, ids[0])
			assert.Equal(t, req2.ID, ids[1])
		})

		t.Run("value just in description 2", func(t *testing.T){
			ids, err := requestDAL.SearchInES("passear")

			// We expect to get just Pet Care: it's the only one with passear in either name or description
			assert.Equal(t, nil, err)
			assert.Equal(t, 1, len(ids))
			assert.Equal(t, req9.ID, ids[0])
		})

		t.Run("value in name and description", func(t *testing.T){
			ids, err := requestDAL.SearchInES("calculo prova")

			// We expect to get Calculo II in first place because it matches calculo in name and prova in description
			// Then we get Cálculo III and Cálculo I because they match calculo in their name and the name match has a higher score
			// At the end, we get Álgebra Linear that matches prova in its description
			assert.Equal(t, nil, err)
			assert.Equal(t, 4, len(ids))
			assert.Equal(t, req2.ID, ids[0])
			assert.Equal(t, req3.ID, ids[1])
			assert.Equal(t, req.ID, ids[2])
			assert.Equal(t, req4.ID, ids[3])
		})
	})
}

func TestSearchRequestWithCategoryInES(t *testing.T){
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	requestDAL := getRequestDAL(db, es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Computação", "Ciência de Computação")
	c4 := tools.CreateFakeCategory(t, db, "Extracurricular", "Extracurricular")

	req1 := tools.CreateFakeRequest(t, db, "Aula de Cálculo I", "Procuro aula particular", u.Userid, c1.ID, time.Now().Add(-10*time.Hour))
	req2 := tools.CreateFakeRequest(t, db, "Álgebra Linear", "Preciso de ajuda para prova", u.Userid, c1.ID, time.Now().Add(-9*time.Hour))
	req3 := tools.CreateFakeRequest(t, db, "Aula de ICC I", "Ajuda para estudar para prova", u.Userid, c2.ID, time.Now().Add(-8*time.Hour))
	req4 := tools.CreateFakeRequest(t, db, "Aula de ICC II", "Ajuda em prova", u.Userid, c2.ID, time.Now().Add(-7*time.Hour))
	req5 := tools.CreateFakeRequest(t, db, "Aula de Piano", "Procuro aula para iniciantes", u.Userid, c4.ID, time.Now().Add(-6*time.Hour))

	for _, req := range []models.Request{req1, req2, req3, req4, req5}{
		err := requestDAL.InsertRequestInES(req)
		assert.Equal(t, nil, err)
	}

	t.Run("Math filter", func(t *testing.T){
		ids, err := requestDAL.SearchInES("prova", c1.ID)

		// We expect to get only request belonging to the first category that has prova in description
		assert.Equal(t, nil, err)
		assert.Equal(t, 1, len(ids))
		assert.Equal(t, req2.ID, ids[0])
	})

	t.Run("CS Filter", func(t *testing.T){
		ids, err := requestDAL.SearchInES("prova", c2.ID)

		// We expect to get Aula de ICC II and Aula de ICC I (in descending creation order)
		assert.Equal(t, nil, err)
		assert.Equal(t, 2, len(ids))
		assert.Equal(t, req4.ID, ids[0])
		assert.Equal(t, req3.ID, ids[1])
	})

	t.Run("Math and CS Filters", func(t *testing.T){
		ids, err := requestDAL.SearchInES("prova", c1.ID, c2.ID)

		// We expect to get request from both categories, sorted in descending order of creation time
		assert.Equal(t, nil, err)
		assert.Equal(t, 3, len(ids))
		assert.Equal(t, req4.ID, ids[0])
		assert.Equal(t, req3.ID, ids[1])
		assert.Equal(t, req2.ID, ids[2])
	})

	t.Run("Extraclass Filter", func(t *testing.T){
		ids, err := requestDAL.SearchInES("aula", c4.ID)

		// We expect to get only Aula de Piano
		assert.Equal(t, nil, err)
		assert.Equal(t, 1, len(ids))
		assert.Equal(t, req5.ID, ids[0])
	})
}

func TestGetRequestsByID(t *testing.T){
	db := tools.GetTestDB()
	es := tools.GetTestES()
	defer tools.CleanDB(db)
	defer tools.CleanES(es)

	requestDAL := getRequestDAL(db, es)

	u := tools.CreateFakeUser(t, db, "user", "user@user.com", "1234", "9999-1111")
	c1 := tools.CreateFakeCategory(t, db, "Aula Matemática", "Matemática")
	c2 := tools.CreateFakeCategory(t, db, "Aula Computação", "Ciência de Computação")

	req1 := tools.CreateFakeRequest(t, db, "Aula de Cálculo I", "Procuro aula particular", u.Userid, c1.ID, time.Now().Add(-10*time.Hour))
	req2 := tools.CreateFakeRequest(t, db, "Aula de Cálculo II", "Tenho prova semana que vem", u.Userid, c1.ID, time.Now().Add(-9*time.Hour))
	req3 := tools.CreateFakeRequest(t, db, "Aula de Cálculo III", "Teorema de Green", u.Userid, c1.ID, time.Now().Add(-8*time.Hour))
	req4 := tools.CreateFakeRequest(t, db, "Álgebra Linear", "Preciso de ajuda para prova", u.Userid, c1.ID, time.Now().Add(-9*time.Hour))
	req5 := tools.CreateFakeRequest(t, db, "Aula de ICC I", "Ajuda para estudar para prova", u.Userid, c2.ID, time.Now().Add(-8*time.Hour))
	req6 := tools.CreateFakeRequest(t, db, "Aula de ICC II", "Ajuda em prova", u.Userid, c2.ID, time.Now().Add(-7*time.Hour))

	t.Run("Get request with 1 ID", func(t *testing.T){
		reqs, err := requestDAL.GetRequestsByID([]string{req1.ID})
		assert.Equal(t, nil, err)
		assert.Equal(t, req1, reqs[0])
	})

	t.Run("Get requests with 3 IDs", func(t *testing.T){
		reqs, err := requestDAL.GetRequestsByID([]string{req1.ID, req2.ID, req3.ID})
		assert.Equal(t, nil, err)
		assert.Equal(t, req1, reqs[0])
		assert.Equal(t, req2, reqs[1])
		assert.Equal(t, req3, reqs[2])
	})

	t.Run("Get request with 6 IDs", func(t *testing.T){
		reqs, err := requestDAL.GetRequestsByID([]string{req1.ID, req2.ID, req3.ID, req4.ID, req5.ID, req6.ID})
		assert.Equal(t, nil, err)
		assert.Equal(t, req1, reqs[0])
		assert.Equal(t, req2, reqs[1])
		assert.Equal(t, req3, reqs[2])
		assert.Equal(t, req4, reqs[3])
		assert.Equal(t, req5, reqs[4])
		assert.Equal(t, req6, reqs[5])
	})
}
