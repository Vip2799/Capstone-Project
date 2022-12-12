package com.niit.FavouriteListService.services;

import com.niit.FavouriteListService.domain.Favourite;
import com.niit.FavouriteListService.domain.FavouriteList;
import com.niit.FavouriteListService.exception.MovieAlreadyExistsException;
import com.niit.FavouriteListService.repository.FavouriteRepository;
import com.niit.MovieService.domain.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
@Service
public class FavouriteServiceImpl implements FavouriteService{

    @Autowired
    private FavouriteRepository favouriteRepository;

    @Override
    public Favourite createFavouriteAccount(String email) {
        Favourite favAccount = new Favourite(email,new ArrayList<>());
        return favouriteRepository.insert(favAccount);
    }

    @Override
    public Favourite getFavAccountByEmail(String email) {
        return favouriteRepository.findById(email).get();
    }

    @Override
    public Favourite addFavouriteList(String email, String favListName) {
        Favourite favAccount = favouriteRepository.findById(email).get();
        List<FavouriteList> favLists = favAccount.getFavouriteLists();
        favLists.add(new FavouriteList(favListName,new ArrayList<>()));
        favAccount.setFavouriteLists(favLists);
        return favouriteRepository.save(favAccount);

    }

    @Override
    public Favourite addMovieToFavList(String email, String favListName, Movie movie) throws MovieAlreadyExistsException {
        Favourite favAccount = favouriteRepository.findById(email).get();
        List<FavouriteList> favLists = favAccount.getFavouriteLists();
        for(int i = 0 ; i < favLists.size() ; i++){
            if(favListName.equalsIgnoreCase(favLists.get(i).getFavListName())){
                FavouriteList favList = favLists.get(i);
                for(int j = 0 ; j < favList.getMovieList().size() ; j++){
                    if(favList.getMovieList().get(i).getId() == movie.getId()){
                        throw new MovieAlreadyExistsException();
                    }
                }
                favLists.get(i).getMovieList().add(movie);
            }
        }
        favAccount.setFavouriteLists(favLists);

        return favouriteRepository.save(favAccount);
    }

    @Override
    public boolean deleteFavListByName(String email, String favListName) {
        List<FavouriteList> favouriteList = favouriteRepository.findById(email).get().getFavouriteLists();
        for(int i = 0 ; i < favouriteList.size() ; i ++){
            if(favListName.equalsIgnoreCase(favouriteList.get(i).getFavListName())){
                favouriteList.remove(i);
                break;
            }
        }
        return true;
    }

    @Override
    public Favourite deleteFavAccBYEmail(String email) {
        favouriteRepository.deleteById(email);
        return favouriteRepository.findById(email).get();
    }

    @Override
    public boolean deleteAllFavAcc() {
        favouriteRepository.deleteAll();
        return true ;
    }

    @Override
    public Favourite deleteMovieFromFavList(String email, String favListName, int movieId) {
        Favourite favAccount = favouriteRepository.findById(email).get();
        List<FavouriteList> favLists = favAccount.getFavouriteLists();
        for(int i = 0 ; i < favLists.size() ; i++){
            if(favLists.get(i).getFavListName().equals(favListName)){
                FavouriteList favList = favLists.get(i);
                for (int j = 0 ; j < favList.getMovieList().size() ; i++ ){
                    
                }
                break;
            }
        }

        favAccount.setFavouriteLists(favLists);
        return favouriteRepository.save(favAccount);
    }

    @Override
    public FavouriteList getFavListByName(String email, String favListName) {
        Favourite favAccount = favouriteRepository.findById(email).get();
        FavouriteList favList = null ;
        for(int i = 0  ; i < favAccount.getFavouriteLists().size() ; i++){
            if(favAccount.getFavouriteLists().get(i).getFavListName().equalsIgnoreCase(favListName)){
                favList = favAccount.getFavouriteLists().get(i);
            }
        }
        return favList;
    }
}
