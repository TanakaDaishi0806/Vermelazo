package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
)

type ErrResponse struct {
	Message string   `json:"message"`
	Details []string `json:"datails,omitempty"`
}

func RespondJSON(ctx context.Context, w http.ResponseWriter, body any, status int) {
	w.Header().Set("Context-Type", "application/json;charset=utf-8")
	bodyBites, err := json.Marshal(body)
	if err != nil {
		fmt.Printf("encode response error:%v", err)
		w.WriteHeader(http.StatusInternalServerError)
		rsp := &ErrResponse{
			Message: http.StatusText(http.StatusInternalServerError),
		}

		if err := json.NewEncoder(w).Encode(rsp); err != nil {
			fmt.Printf("write err response err:%v", err)
		}

		return

	}

	w.WriteHeader(status)

	if _, err := fmt.Fprintf(w, "%s", bodyBites); err != nil {
		fmt.Printf("write response err")
	}
}
